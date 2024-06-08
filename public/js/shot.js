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
        // console.log("사용자 ID:", data.userId); // 콘솔에 사용자 ID 출력
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
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
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
                userId: userId,
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
