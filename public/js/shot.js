const video = document.getElementById('video');

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.onloadedmetadata = function () {
                video.play();
                startCountdown();
            };
        })
        .catch(function (error) {
            alert("웹캠에 접근할 수 없습니다");
        });
}

const countdownElement = document.getElementById('countdown');
const countdownDuration = 3;
let countdown = countdownDuration;
 

// 새로운 사용자 id요청
async function getUserId() {
    const response = await fetch('/getUserId');
    const data = await response.json();
    return data.userId;
}

function startCountdown() {
    countdown = countdownDuration; // 초기화
    const timer = setInterval(function () {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(timer);
            countdownElement.textContent = '찰칵';
            takeSnapshot();
        }
    }, 1000);
}

function takeSnapshot() {
    const userId =  getUserId(); // 사용자 ID 요청
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg');

    // 캡처된 이미지를 서버로 전송
    fetch(`/image_paths/${userId}`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: dataURL })
        
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        console.log(dataURL);

        // 2초 뒤에 다음 페이지로 이동
        setTimeout(goToNextPage, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // 캡처된 이미지를 화면에 표시
    const img = new Image();
    img.src = dataURL;
    document.body.appendChild(img);

    // 3초 후 사진 찍고 화면 멈춤
    video.pause();
    if (video.srcObject) {
        let tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    }
}

function goToNextPage(){
    window.location.href = '/design';
}
