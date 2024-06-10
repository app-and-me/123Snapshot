let currentPage = 1;
const photosPerPage = 3;

// 서버로부터 받아온 이미지와 제목을 화면에 표시하는 함수 
function displayPage(imagePaths, titles) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    imagePaths.forEach((image, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        imgContainer.innerHTML = `
            <img src="${image.image_paths}" alt="Photo ${index + 1}" class="polaroid">
            <div class="title">${titles[index] ? titles[index].titles : ''}</div>
        `;
        outputDiv.appendChild(imgContainer);
    });
}

// 페이지를 가져와서 화면에 표시하는 함수
function fetchAndDisplayPage(pageNumber) {
    fetch(`/board/board?page=${pageNumber}`)
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
fetchAndDisplayPage(1)

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

    document.getElementById('goHomeButton').addEventListener('click', goHome);
    document.getElementById('goHomeText').addEventListener('click', goHome);
});
