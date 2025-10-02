// Smooth fade-in effect on scroll
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

// Typewriter effect
const text = "Hi, my name is Elmer Bacoro. \nA second-year Computer Science student who's passionate about building things that make sense in the real world. This website is part of our Web Design subject  👋";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50); // speed (ms) → 100ms per letter
  }
}

window.onload = typeWriter;


// Text ↔ Binary Converter
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


