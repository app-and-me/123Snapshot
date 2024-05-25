// document.addEventListener("DOMContentLoaded", function() {
//     setTimeout(function() {
//         var letterballoon = document.getElementById('letterballoon');
//         letterballoon.style.bottom = '160px'; // Change bottom position to show the element
//     }, 1000); // Show after 1 second
// });

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var letterballoon = document.getElementById('letterballoon');
        letterballoon.style.bottom = '160px'; 
        setTimeout(function() {
            letterballoon.style.bottom = '10px';
        }, 1500); 
    }, 2000); 

    setTimeout(function() {
        window.location.href = "../views/letter.html";
    }, 6700);
});


// setTimeout(function(){
//     window.location.href="shot.html"; //3초 후 다음 페이지로 이동
// },2500)
