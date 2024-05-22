const video = document.getElementById('video');

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: true
    })

    .then(function (stream) {
        video.srcObject = stream; // 성공적으로 비디오를 가져왔을 때 실행
        video.onloadedmetadata = function () {
            video.play();
            startCountdown(); // 비디오 스트림이 시작된 후 카운트다운 시작
        };
    })

    .catch(function (error) { // getUserMedia()를 실패 했을 때
        alert("웹캠에 접근할 수 없습니다");
    });
}

const countdownElement = document.getElementById('countdown');
const countdownDuration = 3; // 카운트다운 시간(초)
let countdown = countdownDuration;

function startCountdown() {
    const timer = setInterval(function () {
        countdown--; // 3, 2, 1
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(timer);
            countdownElement.textContent = '찰칵'; // 카운트가 끝나면 찰칵이 나오게 하기
            takeSnapshot();
        }
    }, 1000);
}

function takeSnapshot() {
    const canvas = document.createElement('canvas'); //<canvas> 태그 생성
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg');
    console.log(dataURL);  

    // 캡처된 이미지를 화면에 표시 
    const img = new Image();
    img.src = dataURL;
    document.body.appendChild(img);
    console.log("take a picture");

    //3초 후 사진 찍고 화면 멈춤
    video.pause();
    const imgs = new Image();
            img.src = dataURL;
            document.body.appendChild(img);  
              
     // 2초뒤에 다음 페이지로 이동
    setTimeout(goToNextPage,2000);
}

    function goToNextPage(){
        location.href = 'design.html';
    }

    
    
