window.onload = () => {
    // console.log('test')
    const publicButton = document.getElementById('public-button');
    const privateButton = document.getElementById('private-button');

    if (publicButton) {
        publicButton.onclick = () => {
            window.location.href = '/post';
        };
    }

    if (privateButton) {
        privateButton.onclick = () => {
            window.location.href = '/notpost';
        };
    }
};