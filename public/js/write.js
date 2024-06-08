// 이미 생성된 사용자 ID를 가져오는 함수
async function getUserId() {
    try {
        const response = await fetch('/getUserId');
        const data = await response.json();
        return data.userId;
    } catch (error) {
        console.error("Error 발생: ", error);
    }
}

// 사용자 ID와 메시지를 서버에 저장하는 함수
async function saveMessage(userId, message) {
    try {
        const response = await fetch(`/titles/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error 발생: ", error);
    }
}

// 완료 버튼 클릭 시 실행될 함수
async function submitForm(event) {
    event.preventDefault(); // 기본 링크 동작을 막음

    try {
        const userId = await getUserId(); // 이미 생성된 사용자 ID를 받음
        const message = document.getElementById("writing-box").value; // 작성한 메시지 가져오기
        console.log({ "사용자 ID": userId, "메시지": message });
        
        const result = await saveMessage(userId, message); // 서버에 사용자 ID와 메시지 저장
        console.log("결과:", result);
        
        window.location.href = "/choose"; //다음 페이지로 이동
    } catch (error) {
        console.error("Error 발생: ", error);
    }
}

// 완료 버튼 클릭 이벤트 리스너 등록
document.querySelector('.finish').addEventListener('click', submitForm);
