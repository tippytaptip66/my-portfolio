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
const typewriter = document.getElementById("typewriter");
const words = ["Web Developer", "Problem Solver", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
  currentWord = words[wordIndex];
  if (isDeleting) {
    typewriter.textContent = currentWord.substring(0, charIndex--);
  } else {
    typewriter.textContent = currentWord.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}
typeEffect();

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

