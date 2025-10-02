// ==================== Fade-in on Scroll ====================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));


// ==================== Typewriter Effect ====================
const text = "Hello, my name is Elmer Bacoro 👋";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50); // speed per letter
  }
}


// ==================== Text ↔ Binary Converter ====================
function textToBinary() {
  const text = document.getElementById("textInput").value;
  const binary = text.split("")
    .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
  document.getElementById("output").value = binary;
}

function binaryToText() {
  const binary = document.getElementById("textInput").value.trim().split(" ");
  try {
    const text = binary.map(bin => String.fromCharCode(parseInt(bin, 2))).join("");
    document.getElementById("output").value = text;
  } catch {
    document.getElementById("output").value = "Invalid binary input!";
  }
}


// ==================== Zipper Preloader ====================
const handle = document.getElementById("zipper-handle");
const left = document.querySelector(".zipper-left");
const right = document.querySelector(".zipper-right");
const screen = document.getElementById("zipper-screen");

let isDragging = false;
let startY = 0;

handle.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let dragDistance = e.clientY - startY;

  if (dragDistance > 0) {
    // Move zipper panels apart
    left.style.transform = `translateX(${-dragDistance}px)`;
    right.style.transform = `translateX(${dragDistance}px)`;
    handle.style.top = dragDistance + "px";
  }
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;

  let dragDistance = parseInt(handle.style.top);

  if (dragDistance > window.innerHeight / 2) {
    // ✅ If dragged far enough → fully open
    left.style.transform = "translateX(-100%)";
    right.style.transform = "translateX(100%)";
    handle.style.display = "none";
    setTimeout(() => {
      screen.style.display = "none";
      typeWriter(); // Start typewriter only AFTER unzip
    }, 800);
  } else {
    // Reset if not dragged enough
    left.style.transform = "translateX(0)";
    right.style.transform = "translateX(0)";
    handle.style.top = "0px";
  }
});
