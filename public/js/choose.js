function publicNextPage(event){
    event.preventDefault(); // 폼의 기본 제출 동작을 막음
    var form = document.getElementById('myForm');
    form.submit(); // 폼을 제출
    window.location.href = 'post.ejs'; // 다음 페이지로 넘어가기
}

function privateNextPage(event){
    event.preventDefault();
    var from = document.getElementById('myForm');
    form.submit();
    window.location.href = '#';
}