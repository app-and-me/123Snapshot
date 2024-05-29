const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const imageLoader = document.getElementById("jsImageLoader");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 688;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 3;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange)
}

function handleImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 65, 40, 554, 505);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
}

function loadImage() {
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 65, 40, 554, 505);
  }
  img.src = "../public/images/test.jpg";
}

if (imageLoader) {
  imageLoader.addEventListener("change", handleImage);
}

// Load the image from a predefined URL
loadImage();



const penButton = document.getElementById('pen');
const colorElements = document.querySelectorAll('.controls__color');

// Initially hide the color elements
colorElements.forEach(element => element.classList.add('hidden'));

penButton.addEventListener('click', () => {
    colorElements.forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
            element.classList.add('show');
        } else {
            element.classList.remove('show');
            element.classList.add('hidden');
        }
    });
});

penButton.addEventListener('click', () => {
    colorElements.forEach(element => {
        element.classList.toggle('show');
    });
});
//시험


