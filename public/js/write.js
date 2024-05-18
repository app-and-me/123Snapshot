document.addEventListener('DOMContentLoaded', () => {
    const titleBox = document.getElementById('title-box');
    const writingBox = document.getElementById('writing-box');

    const addPlaceholder = (box, placeholder) => {
        if (!box.textContent.trim()) {
            box.textContent = placeholder;
            box.classList.add('placeholder');
        }
    };

    const removePlaceholder = (box, placeholder) => {
        if (box.textContent.trim() === placeholder) {
            box.textContent = '';
            box.classList.remove('placeholder');
        }
    };

    titleBox.addEventListener('focus', () => removePlaceholder(titleBox, '제목을 입력해주세요'));
    titleBox.addEventListener('blur', () => addPlaceholder(titleBox, '제목을 입력해주세요'));

    writingBox.addEventListener('focus', () => removePlaceholder(writingBox, '과거의 나에게 하고싶은 말을 입력해주세요'));
    writingBox.addEventListener('blur', () => addPlaceholder(writingBox, '과거의 나에게 하고싶은 말을 입력해주세요'));

    // Initialize the placeholders
    addPlaceholder(titleBox, '제목을 입력해주세요');
    addPlaceholder(writingBox, '과거의 나에게 하고싶은 말을 입력해주세요');
});
 

