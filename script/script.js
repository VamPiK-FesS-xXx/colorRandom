const cols = document.querySelectorAll(".col");
const popUp = document.querySelector(".copied-color");
// console.log(lockIcon);
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});
document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");

    console.log(node);
  } else if (type === "color" && "copied") {
    copyToClickBoard(event.target.textContent);
    popUp.classList.add("show");
    if (popUp.classList.contains("show")) {
      setTimeout(() => popUp.classList.remove("show"), 1000);
    }
    popUp.innerHTML = "copied " + event.target.textContent + "!";
  }
});
function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const h2 = col.querySelector("h2");
    const lockBtn = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();
    if (!isInitial) {
      colors.push(color);
    }
    h2.textContent = color;
    col.style.background = color;
    setTextColor(h2, color, lockBtn);
  });

  updateColorsHash(colors);
}
setRandomColors();

function setTextColor(text, color, button) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
  button.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
} //update location url

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}
function copyToClickBoard(text) {
  return navigator.clipboard.writeText(text);
}
//random color function
// function generateRandomColor() {
//   const hexCodes = "0123456789ABCDEF";
//   let color = "";
//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }
//   return "#" + color;
// }
// btns.forEach((e) => {
//   e.addEventListener("click", (event) => {
//     if (event.target.dataset.index) {
//       const index = parseInt(event.target.dataset.index);
//       console.log(index);
//       if (lockIcon.forEach(e.classList.contains("fa-lock-open"))) {
//         e.classList.remove("open");
//       }
//     }
//   });
// });
