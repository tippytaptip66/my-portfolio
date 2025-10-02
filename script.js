// Typewriter effect
const text = "Hello, my name is Elmer Bacoro 👋";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
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

// ZIPPER EFFECT
const handle = document.getElementById("zipper-handle");
const track = document.getElementById("zipper-track");
const left = document.querySelector(".zipper-left");
const right = document.querySelector(".zipper-right");
const screen = document.getElementById("zipper-screen");

// Zipper sound
const zipSound = new Audio("zip.mp3");

let isDragging = false;
let startY = 0;
let currentY = 0;

handle.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY - currentY;
  handle.style.cursor = "grabbing";
  zipSound.play(); // play sound when drag starts
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentY = e.clientY - startY;
  if (currentY < 20) currentY = 20;
  if (currentY > window.innerHeight - 80) currentY = window.innerHeight - 80;

  handle.style.top = currentY + "px";
  left.style.transform = `translateX(${-currentY}px)`;
  right.style.transform = `translateX(${currentY}px)`;
  track.style.clipPath = `inset(0 ${currentY / 2}px 0 ${currentY / 2}px)`;
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  handle.style.cursor = "grab";

  if (currentY > window.innerHeight / 2) {
    // Fully open
    left.style.transform = "translateX(-100%)";
    right.style.transform = "translateX(100%)";
    track.style.opacity = 0;
    handle.style.transition = "top 0.6s ease";
    handle.style.top = window.innerHeight + "px";
    setTimeout(() => { screen.style.display = "none"; }, 800);
  } else {
    // Reset
    left.style.transform = "translateX(0)";
    right.style.transform = "translateX(0)";
    track.style.clipPath = "inset(0 0 0 0)";
    handle.style.transition = "top 0.3s ease";
    handle.style.top = "20px";
    currentY = 20;
    setTimeout(() => { handle.style.transition = "none"; }, 400);
  }
});
