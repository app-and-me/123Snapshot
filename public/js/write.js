document.addEventListener('DOMContentLoaded', () => {
    
    const writingBox = document.getElementById('writing-box');
    const placeholderPart1 = '과거의 나에게 한마디를 남긴다면?';
    const placeholderPart2 = '예시: 걱정하지 마, 잘될 거야~';
    const placeholderHTML = `${placeholderPart1}<div>${placeholderPart2}</div>`;

    const addPlaceholder = (box, placeholderHTML) => {
        if (!box.innerHTML.trim() || box.innerHTML === '<br>') {
            box.innerHTML = placeholderHTML;
            box.classList.add('placeholder');
        }
    };

    const removePlaceholder = (box, placeholderHTML) => {
        if (box.innerHTML.trim() === placeholderHTML) {
            box.innerHTML = '';
            box.classList.remove('placeholder');
        }
    };

    writingBox.addEventListener('focus', () => removePlaceholder(writingBox, placeholderHTML));
    writingBox.addEventListener('blur', () => addPlaceholder(writingBox, placeholderHTML));

    // Initialize the placeholders
    addPlaceholder(writingBox, placeholderHTML);
});
