document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var letterballoon = document.getElementById('letterballoon');
        letterballoon.style.bottom = '190px'; 
        setTimeout(function() {
            letterballoon.style.bottom = '90px';
        }, 1500); 
    }, 1300); 

    setTimeout(function() {
        window.location.href = "/letter";
    }, 5000);
});
