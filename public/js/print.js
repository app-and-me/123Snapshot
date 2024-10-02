const printButton = document.getElementById('public-button');
const notPrintButton = document.getElementById('private-button');

if (printButton) {
        printButton.onclick = () => {
            window.location.href = '/choose';
        };   
}

if (notPrintButton) {
        notPrintButton.onclick = () => {
            window.location.href = '/choose';  // 여기서 '/'를 '/choose'로 수정
        };   
}
