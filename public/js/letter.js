document.addEventListener("DOMContentLoaded", function() {
    // 페이지 로드 후 1.5초 후에 편지가 열리도록 설정
    setTimeout(function() {
        document.querySelector('.letter').classList.add('letter--open');
        // 열린 봉투 이미지와 편지 내용 이미지 순차적으로 표시
        setTimeout(function() {
          
            setTimeout(function() {
                document.querySelector('.letter-content img').style.opacity = 1;
                // 편지 내용 이미지가 나타난 후 추가 이미지들을 순차적으로 보이기
                var additionalImages = document.querySelectorAll('.additional-images img');
                var delay = 500; // 각 이미지 사이의 딜레이
                additionalImages.forEach(function(image, index) {
                    setTimeout(function() {
                        image.style.opacity = 1; // 이미지 보이기
                        if (index > 0) {
                            additionalImages[index - 1].style.opacity = 0; // 이전 이미지 숨기기
                        }
                    }, delay * (index + 1)); // 각 이미지마다 일정한 시간 간격으로 보이기
                });
                 
                setTimeout(function() {
                    window.location.href = '/shot';
                }, 3000);  
            }, 500); //편지 내용 이미지 나타나기
        }, 700); //열린 봉투 이미지 나타나기
    }, 1800); //편지 열림 시작
});