document.addEventListener('DOMContentLoaded', () => {

  // ===== Fade-in on scroll =====
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length) {
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    faders.forEach(f => appearOnScroll.observe(f));
  }

  // ===== Typewriter (will be started after unzip) =====
  const typeText = "Hello, my name is Elmer Bacoro 👋";
  let typeIndex = 0;
  const typeTarget = document.getElementById('typewriter');
  function typeWriter() {
    if (!typeTarget) return;
    if (typeIndex < typeText.length) {
      typeTarget.textContent += typeText.charAt(typeIndex++);
      setTimeout(typeWriter, 45);
    }
  }

  // ===== Text ↔ Binary Converter & Copy =====
  const textInput = document.getElementById('textInput');
  const output = document.getElementById('output');
  const btnTextToBinary = document.getElementById('btnTextToBinary');
  const btnBinaryToText = document.getElementById('btnBinaryToText');
  const btnCopy = document.getElementById('btnCopyOutput');

  if (btnTextToBinary) btnTextToBinary.addEventListener('click', () => {
    const txt = textInput.value || "";
    const bin = txt.split("").map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(" ");
    output.value = bin;
  });

  if (btnBinaryToText) btnBinaryToText.addEventListener('click', () => {
    const binStr = (textInput.value || "").trim();
    if (!binStr) { output.value = ""; return; }
    const parts = binStr.split(/\s+/);
    try {
      const txt = parts.map(p => String.fromCharCode(parseInt(p, 2))).join("");
      output.value = txt;
    } catch {
      output.value = "Invalid binary input!";
    }
  });

  if (btnCopy) btnCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.value || "");
      btnCopy.textContent = "Copied!";
      setTimeout(()=> btnCopy.textContent = "Copy Output", 1200);
    } catch {
      // fallback
      output.select();
      document.execCommand('copy');
      btnCopy.textContent = "Copied!";
      setTimeout(()=> btnCopy.textContent = "Copy Output", 1200);
    }
  });

  // ===== Zipper drag (pointer events so touch + mouse works) =====
  const handle = document.getElementById('zipper-handle');
  const left = document.querySelector('.zipper-left');
  const right = document.querySelector('.zipper-right');
  const screen = document.getElementById('zipper-screen');

  if (handle && left && right && screen) {
    let dragging = false;
    let startY = 0;
    let currentDrag = 0;

    function pointerDown(e) {
      dragging = true;
      // support pointer and touch events
      startY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY) || 0;
      // prevent page scroll while dragging
      document.body.style.touchAction = 'none';
    }

    function pointerMove(e) {
      if (!dragging) return;
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY) || 0;
      let drag = clientY - startY;
      if (drag < 0) drag = 0;
      currentDrag = drag;
      left.style.transform = `translateX(${-drag}px)`;
      right.style.transform = `translateX(${drag}px)`;
      handle.style.top = `${drag}px`;
    }

    function pointerUp() {
      if (!dragging) return;
      dragging = false;
      document.body.style.touchAction = ''; // restore
      const threshold = window.innerHeight * 0.33; // 33% of screen height
      if (currentDrag > threshold) {
        // fully open
        left.style.transition = 'transform 0.6s ease';
        right.style.transition = 'transform 0.6s ease';
        left.style.transform = 'translateX(-100%)';
        right.style.transform = 'translateX(100%)';
        handle.style.transition = 'opacity 0.5s';
        handle.style.opacity = '0';
        setTimeout(()=> {
          screen.style.display = 'none';
          typeWriter(); // start typewriter AFTER unzip
        }, 650);
      } else {
        // reset back
        left.style.transition = 'transform 0.35s ease';
        right.style.transition = 'transform 0.35s ease';
        handle.style.transition = 'top 0.35s ease';
        left.style.transform = 'translateX(0)';
        right.style.transform = 'translateX(0)';
        handle.style.top = '20px';
      }
      currentDrag = 0;
    }

    // pointer events
    handle.addEventListener('pointerdown', pointerDown);
    window.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp);

    // keyboard accessibility: Enter or Space triggers open
    handle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // immediate open animation
        left.style.transform = 'translateX(-100%)';
        right.style.transform = 'translateX(100%)';
        handle.style.opacity = '0';
        setTimeout(()=> { screen.style.display = 'none'; typeWriter(); }, 650);
      }
    });
  } else {
    // if zipper elements are missing, just start typewriter immediately
    typeWriter();
  }

}); // DOMContentLoaded
