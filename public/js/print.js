const printButton = document.getElementById('public-button');
const notPrintButton = document.getElementById('private-button');

if (printButton) {
    setTimeout(function () {
       printButton.onclick = () => {
            window.location.href = '/';
        };
    }, 1200);  
}

if (notPrintButton) {
    setTimeout(function () {
        notPrintButton.onclick = () => {
            window.location.href = '/';
        };
    }, 1200);  
}
