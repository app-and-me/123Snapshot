document.querySelector('.photo').addEventListener('click', async (event) => {
    event.preventDefault();     // 기본 링크 동작을 막음
    
    // 새로운 사용자 id요청
    async function getUserId() {
        const response = await fetch('/newUserId');
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

    try {
        const userId = await getUserId();    // id를 받음
        const result = await saveUserId(userId);    // 서버에 id를 저장
        console.log(result);

        window.location.href = "/story";    // 원래 페이지로 이동
    }
    catch(error) {
        console.error("Error 발생: ", error);
    }
    
    

});