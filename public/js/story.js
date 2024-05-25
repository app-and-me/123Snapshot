// document.addEventListener("DOMContentLoaded", function() {
//     setTimeout(function() {
//         var letterballoon = document.getElementById('letterballoon');
//         letterballoon.style.bottom = '160px'; // Change bottom position to show the element
//     }, 1000); // Show after 1 second
// });

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var letterballoon = document.getElementById('letterballoon');
        letterballoon.style.bottom = '190px'; 
        setTimeout(function() {
            letterballoon.style.bottom = '90px';
        }, 1500); 
    }, 3000); 

    setTimeout(function() {
        window.location.href = "../views/letter.html";
    }, 7000);
});
