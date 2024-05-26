function nextPage(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막음
    document.forms[0].submit(); // 폼을 제출
    window.location.href = 'index.html'; // 페이지 리디렉션
}