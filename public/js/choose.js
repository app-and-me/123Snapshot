async function getUserId() {
    try {
        const response = await fetch('/getUserId');
        const data = await response.json();
        return data.userId;
    } catch (error) {
        console.error("Error 발생: ", error);
    }
}

window.onload = async () => {
    // console.log('test')
    const publicButton = document.getElementById('public-button');
    const privateButton = document.getElementById('private-button');
    const userId = await getUserId();       // 사용자 ID 요청

    if (publicButton) {
        publicButton.onclick = () => {
            fetch(`choose/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ yn : 'yes' })  // yes를 서버로 보냄
            })
            window.location.href = '/post';
        };
    }

    if (privateButton) {
        privateButton.onclick = () => {
            fetch(`choose/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ yn : 'no' })  // no를 서버로 보냄
            })
            window.location.href = '/notpost';
        };
    }
};