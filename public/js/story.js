document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var letterballoon = document.getElementById('letterballoon');
        letterballoon.style.bottom = '190px'; 
        setTimeout(function() {
            letterballoon.style.bottom = '90px';
        }, 1500); 
    }, 1300); 

    setTimeout(function() {
        window.location.href = "/letter";
    }, 5000);
});

/*DomcontentLoaded : 페이지 로드 실행 후 실행*/
// 풍선 올라가는 sound
document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        const audio = new Audio('audio/balloonUp.mp3');
        audio.play();
    }, 1000);  
});