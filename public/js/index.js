// 새로운 사용자 id요청
async function newUserId() {
    const response = await fetch('/newUserId');
    const data = await response.json();
    return data.userId;
}

// 사용자 id 조회
async function getUserId() {
    const response = await fetch('/getUserId');
    const data = await response.json();
    return data.userId;
  }
    
// 사용자 id를 서버에 저장
async function saveUserId(userId) {
    const res = await fetch('/saveUserId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });

    const data = await res.json();
    return data;
}

document.querySelector('.photo').addEventListener('click', async (event) => {
    event.preventDefault();     // 기본 링크 동작을 막음

    try {
        const userId = await newUserId();    // id를 받음
        console.log(userId);       // console에서 test
        const result = await saveUserId(userId);    // 서버에 id를 저장
        console.log(result);

        window.location.href = "/story";    // 원래 페이지로 이동
    }
    catch(error) {
        console.error("Error 발생: ", error);
    }

});







// 게시물 보기 버튼 클릭 이벤트 리스너 등록

document.querySelector('.view-board').addEventListener('click', () => {

    window.location.href = "/board"; // 게시물 보기 페이지로 이동

});