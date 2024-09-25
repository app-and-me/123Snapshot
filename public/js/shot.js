const video = document.getElementById('video');
const countdownElement = document.getElementById('countdown');
const countdownDuration = 3;
let countdown = countdownDuration;

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

async function getUserId() {
    try {
        const response = await fetch('/getUserId');
        const data = await response.json();
        return data.userId;
    } catch (error) {
        console.error("Error 발생: ", error);
    }
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

async function takeSnapshot() {
    const userId = await getUserId(); // 사용자 ID 요청
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    // 캔버스 좌우 반전 방지 설정
    context.translate(canvas.width, 0); // 캔버스의 시작 지점을 오른쪽 끝으로 이동
    context.scale(-1, 1); // 좌우 반전 설정

    // 비디오의 현재 프레임을 캔버스에 그리기
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 캔버스를 이미지 데이터로 변환
    const dataURL = canvas.toDataURL('image/jpeg');

    console.log("사용자 ID:", userId);
    console.log("사진 URL:", dataURL);

    try {
        const response = await fetch(`/image_paths/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageUrl: dataURL
            })
        });
        const result = await response.text();
        console.log("결과:", result);
    } catch (error) {
        console.error('Error:', error);
    }

    // 3초 후 사진 찍고 화면 멈춤
    video.pause();
    if (video.srcObject) {
        let tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    }

    setTimeout(goToNextPage, 2000);
}

function goToNextPage() {
    window.location.href = '/design';
}

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        const shotAudio = new Audio('audio/shutter.mp3')
        shotAudio.play();
    }, 4500); //4.5초 뒤에 소리나게 
})
