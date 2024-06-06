const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const imageLoader = document.getElementById("jsImageLoader");

const INITIAL_COLOR = "#2c2c2c";
// const CANVAS_SIZE = 688;

// canvas.width = CANVAS_SIZE;
// canvas.height = CANVAS_SIZE;

const CANVAS_WIDTH = 688; // 추가된 부분
const CANVAS_HEIGHT = 746; // 추가된 부분

canvas.width = CANVAS_WIDTH; // 수정된 부분
canvas.height = CANVAS_HEIGHT;

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
//이미지 불러오기
loadImage();

const penButton = document.getElementById('pen');
const colorElements = document.querySelectorAll('.controls__color');


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

//캔버스 지우고 이미지 다시 불러옴
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  loadImage();
  
}

eraser.addEventListener("click", clearCanvas);

function sendDataToServer(dataURL) {
  const base64Data = dataURL.split(',')[1];
  
  fetch('/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: base64Data })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

//시험
//일부만 캡처됨
const completeButton = document.getElementById("complete");

completeButton.addEventListener("click", () => {
  // 캔버스의 내용을 이미지로 캡처
  
  // 캡처된 이미지의 URL 출력
  console.log("Captured Image URL:", dataURL);
  
  // 서버에 데이터 전송 (해당 함수가 존재하지 않는 경우 주석 처리)
  // sendDataToServer(dataURL);
});



