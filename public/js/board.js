 
let currentPage = 1;
const photosPerPage = 3;

// 서버로부터 받아온 이미지와 제목을 화면에 표시하는 함수 
function displayPage(imagePaths, titles) {
    // 출력을 담당할 div 요소 가져오기
    const outputDiv = document.getElementById('output');
    // 초기화
    outputDiv.innerHTML = '';

  
    imagePaths.forEach((image, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        
        photoDiv.innerHTML = `
            <img src="${image.path}" alt="Photo ${index + 1}">
            <p>${titles[index] ? titles[index].title : ''}</p>
        `;
        outputDiv.appendChild(photoDiv);
    });
}

// 페이지를 가져와서 화면에 표시하는 함수
function fetchAndDisplayPage(pageNumber) {
    
    fetch(`/board?page=${pageNumber}&perPage=${photosPerPage}`)
        .then(response => response.json())
        .then(data => {
             
            console.log('Fetched data:', data);
            if (data.message.includes("성공")) {
                 
                displayPage(data.imagePaths, data.titles);
                
                updateNavigation(data.pagination);
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}
 
function updateNavigation(pagination) {
    const prevButton = document.getElementById('btn-prev');
    const nextButton = document.getElementById('btn-next');

 
    if (pagination.previous) {
        prevButton.disabled = false;
        prevButton.dataset.page = pagination.previous.page;
    } 
    // else {
        
    //     prevButton.disabled = true;
    // }

     
    if (pagination.next) {
        nextButton.disabled = false;
        nextButton.dataset.page = pagination.next.page;
    } 
    //else {
    //     // 다음 페이지가 없으면 다음 버튼을 비활성화합니다.
    //     nextButton.disabled = true;
    // }
}

 
function goToPreviousPage() {
    const page = document.getElementById('btn-prev').dataset.page;
    if (page) {
        currentPage = parseInt(page);
        fetchAndDisplayPage(currentPage);
    }
}
 
function goToNextPage() {
    const page = document.getElementById('btn-next').dataset.page;
    if (page) {
        currentPage = parseInt(page);
        fetchAndDisplayPage(currentPage);
    }
}
 
window.onload = () => {
    
    document.getElementById('btn-prev').addEventListener('click', goToPreviousPage);
   
    document.getElementById('btn-next').addEventListener('click', goToNextPage);

    
    fetchAndDisplayPage(currentPage);
}

 
document.addEventListener('DOMContentLoaded', (event) => {
    
    const goHome = () => {
        window.location.href = '/';
    }
 
    document.getElementById('goHomeButton').addEventListener('click', goHome);
     
    document.getElementById('goHomeText').addEventListener('click', goHome);
});
