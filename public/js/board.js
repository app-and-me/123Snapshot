let currentPage = 1;
const photosPerPage = 3;

// 서버로부터 받아온 이미지와 제목을 화면에 표시하는 함수 - displayPage
function displayPage(imagePaths, titles) {
     
    for (let i = 0; i < photosPerPage; i++) {
        const outputDiv = document.getElementById(`output${i + 1}`);
        const titleDiv = document.getElementById(`title${i + 1}`);
        outputDiv.innerHTML = '';

        if (imagePaths[i]) {
            outputDiv.innerHTML = `
                <img src="${imagePaths[i].image_paths}" alt="Photo ${i + 1}" class="polaroid${i + 1}">
            `;
            titleDiv.textContent = titles[i] ? titles[i].titles : '';
        } else {
            // 이 슬롯에 이미지가 없는 경우 출력 div와 제목 비우기(안보이게)
            outputDiv.innerHTML = '';
            titleDiv.textContent = '';
        }
    }
}

// 페이지를 가져와서 화면에 표시하는 함수
function fetchAndDisplayPage(pageNumber) {
    fetch(`/board/board?page=${pageNumber}`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            if (data.message.includes("성공")) {
                displayPage(data.imagePaths, data.titles); // 데이터를 받아서 displayPage에 전달
                updateNavigation(data.pagination); // 페이지 네비게이션 업데이트
                updatePageNumber(pageNumber); // 페이지 번호 업데이트
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

// 페이지 번호를 업데이트하는 함수
function updatePageNumber(pageNumber) {
    const pageNumberDiv = document.getElementById('pageNumber');
    pageNumberDiv.textContent = `- ${pageNumber} -`;
}

function updateNavigation(pagination) {
    const prevButton = document.getElementById('btn-prev');
    const nextButton = document.getElementById('btn-next');

    if (pagination.previous) {
        prevButton.disabled = false;
        prevButton.dataset.page = pagination.previous.page;
    } else {
        prevButton.disabled = true;
    }

    if (pagination.next) {
        nextButton.disabled = false;
        nextButton.dataset.page = pagination.next.page;
    } else {
        nextButton.disabled = true;
    }
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
    document.getElementById('homeButton').addEventListener('click', goHome);
});
