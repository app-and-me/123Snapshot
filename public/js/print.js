const printButton = document.getElementById('public-button');
const notPrintButton = document.getElementById('private-button');

if (printButton) {
        printButton.onclick = () => {
            window.location.href = '/choose';
        };   
}

if (notPrintButton) {
        notPrintButton.onclick = () => {
            window.location.href = '/choose';  // 여기서 '/'를 '/choose'로 수정
        };   
}



const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
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

 
// 완료 버튼
const completeButton = document.getElementById("complete");


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

 