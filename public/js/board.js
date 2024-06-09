//const { Letter } = require("../../models");

/*
async function getPaginationImages(currentPage) {
    try {
      const page = parseInt(currentPage) || 1; // 요청된 페이지. 기본값은 1
      const perPage = 3; // 페이지당 항목 수

      // 시작 인덱스 계산
      const startIndex = (page - 1) * perPage;
      
      // yn이 1인, 공개된 사진 및 title만 검색
      const [image_paths, titles] = await Promise.all([
        Letter.findAll({ 
          where: { yn: 1 },
          offset: startIndex, 
          limit: perPage }),
        Letter.findAll({ 
          where: { yn: 1 },
          offset: startIndex, 
          limit: perPage }),
      ]);
  
      // 공개된 항목 총 사진 및 글 개수 가져오기
      const [imageTotalCount, titleTotalCount] = await Promise.all([
        image_paths.count({ where: { yn: 1 }}),
        titles.count({ where: { yn: 1 }}),
      ]);
  
      // 결과 객체 준비
      // results ={image_paths, titles, imageTotalCount, titleTotalCount}
      const results = {
        image_paths: ['img1.png', 'img2.png', 'img3.png'],
        titles: ['img1', 'img2', 'img3'],
        imageTotalCount: 100,
        titleTotalCount: 100,
      }
  
      //if (image_paths.length > 0 || titles.length > 0) {
        return res.status(200).json({ message: "페이징된 사진 및 글 목록 불러오기 성공", results });
      //} else {
      //  return res.status(400).json({ message: "페이징된 사진 및 글 목록 불러오기 실패" });
      //}
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "페이징된 사진 및 글 목록 불러오기 실패" });
    }
  };

*/

// 페이지 인덱스 변수
let currentPage = 1;

// 페이지당 사진 개수
const photosPerPage = 3;

// 전체 사진 수
const totalPhotos = 100;

// 페이지 수 계산
const totalPages = Math.ceil(totalPhotos / photosPerPage);


// 페이지 표시 함수
function displayPage(pageNumber) {
    // 페이지 번호에 맞게 사진을 표시하는 기능을 구현해야 하지만 여기서는 임의의 텍스트로 대체합니다.
    const photos = [];
    for (let i = 0; i < photosPerPage; i++) {
        photos.push(`<p>Photo ${pageNumber * photosPerPage - photosPerPage + i + 1}</p>`);
    }
    console.log(`Page ${pageNumber}:`, photos);
    // outputDiv.innerHTML = photos.join(''); // 출력 부분 업데이트
}

// 초기 페이지 표시
displayPage(currentPage);

function handlePage(isNext=true){
    isNext ? currentPage++ : currentPage--;
    displayPage(currentPage)
}

// 이전 페이지로 이동하는 함수
function goToPreviousPage() {
    if (currentPage > 1) {
        handlePage(false)
    }
}

// 다음 페이지로 이동하는 함수
function goToNextPage() {
    if (currentPage < totalPages) {
        handlePage()
    }
}

window.onload = () =>{
    const outputDiv = document.getElementById('output')
    outputDiv.innerHTML = ''; // 출력 부분 초기화

    // 왼쪽 버튼 클릭 시 이전 페이지로 이동
    document.getElementById('btn-prev').addEventListener('click', goToPreviousPage);

    // 오른쪽 버튼 클릭 시 다음 페이지로 이동
    document.getElementById('btn-next').addEventListener('click', goToNextPage);
}
