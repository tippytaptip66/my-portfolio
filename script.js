
const text = "Hi, my name is Elmer Bacoro 👋";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100); 
  }
}

window.onload = typeWriter;


function textToBinary() {
  const text = document.getElementById("textInput").value;
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    binary += text[i].charCodeAt(0).toString(2).padStart(8, "0") + " ";
  }
  document.getElementById("output").value = binary.trim();
}


function binaryToText() {
  const binary = document.getElementById("textInput").value.trim().split(" ");
  let text = "";
  for (let b of binary) {
    if (b.match(/^[01]+$/)) {
      text += String.fromCharCode(parseInt(b, 2));
    }
  }
  document.getElementById("output").value = text;
}

