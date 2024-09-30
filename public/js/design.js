const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const imageLoader = document.getElementById("jsImageLoader");

// 캔버스 설정
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 688;
const CANVAS_HEIGHT = 745;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 3;

let painting = false;
let filling = false;
let userId = null; // 사용자 ID 저장 변수

// 그리기 중지 함수
function stopPainting() {
  painting = false;
}

// 그리기 시작 함수
function startPainting() {
  painting = true;
}

// 마우스 이동 시 그리기
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

// 색상 변경
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 선 굵기 변경
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// 캔버스 클릭 시 채우기
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// 캔버스 이벤트 리스너 설정
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// 색상 선택
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

// 선 굵기 조절
if (range) {
  range.addEventListener("input", handleRangeChange)
}

// 이미지 로드 함수
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

// 사용자 ID 가져오기 및 이미지 로드
fetch('/getUserId')
  .then(response => response.json()) 
  .then(data => {
    userId = data.userId;
    console.log('User ID:', userId);
    loadImageFromServer(userId); // 이미지 로드 함수 호출
  })
  .catch(error => {
    console.error('Error:', error);
  });

// 서버에서 이미지 로드
function loadImageFromServer(userId) {
  fetch(`/image_paths/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const imagePath = data.imagePath;
      const img = new Image();
      img.onload = function () {
        const targetWidth = 520;
        const targetHeight = 470;
        
        const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        
        const x = 69 + (554 - newWidth) / 2;
        const y = 35 + (505 - newHeight) / 2;
        
        ctx.clearRect(63, 50, 554, 505);
        
        ctx.drawImage(img, x, y, newWidth, newHeight);
      }
      img.src = imagePath;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// 캔버스 초기화
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (userId) { // userId가 정의된 경우에만 loadImageFromServer 호출
    loadImageFromServer(userId);
  } else {
    console.error('User ID is not defined.');
  }
}

// 리셋 버튼 이벤트 리스너
reset.addEventListener("click", clearCanvas);

// 서버로 데이터 전송
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

const penButton = document.getElementById('pen');
const colorElements = document.querySelectorAll('.controls__color');

colorElements.forEach(element => element.classList.add('hidden'));

// 펜 버튼에서 색상들 나오기
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

// 완료 버튼
const completeButton = document.getElementById("complete");

// 완료 버튼 클릭 시 이미지 저장 및 페이지 이동
completeButton.addEventListener("click", async () => {
  // 캔버스의 내용을 이미지로 캡처
  const dataURL = canvas.toDataURL();
  
  // 캡처된 이미지의 URL 출력
  console.log(dataURL);

  const res = await fetch(`image_paths/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newImageData : dataURL }) 
  })

  console.log("이미지 수정 결과 : " + res);

  window.location.href = "/write";
});

// 오버레이 표시 함수
function showOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
  setTimeout(() => {
      overlay.style.opacity = '1';
  }, 0);

  setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
          overlay.style.display = 'none';
      }, 1000);
  }, 3000);
}

// 페이지 로드 시 오버레이 표시
window.addEventListener('load', () => {
  showOverlay();
});