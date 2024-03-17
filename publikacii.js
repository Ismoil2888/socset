document.addEventListener('DOMContentLoaded', function () {
    const publishedImages = JSON.parse(localStorage.getItem('publishedImages')) || [];

    const postContainer = document.getElementById('postContainer');

    publishedImages.forEach((imageData, index) => {
        const postElement = createPostElement(imageData, index);
        postContainer.appendChild(postElement);
    });
});

function createPostElement(imageData, index) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const imgElement = document.createElement('img');
    imgElement.src = imageData;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function () {
        deletePost(postElement, index);
    };

    // Добавляем обработчик события для долгого нажатия на компьютерах
    let timeoutId;
    postElement.addEventListener('mousedown', function () {
        timeoutId = setTimeout(function () {
            deleteBtn.style.display = 'block';
        }, 1000); // Устанавливаем время задержки в 1 секунду
    });

    postElement.addEventListener('mouseup', function () {
        clearTimeout(timeoutId);
    });

    // Добавляем обработчик события для долгого нажатия на мобильных устройствах
    postElement.addEventListener('touchstart', function () {
        timeoutId = setTimeout(function () {
            deleteBtn.style.display = 'block';
        }, 1000); // Устанавливаем время задержки в 1 секунду
    });

    postElement.addEventListener('touchend', function () {
        clearTimeout(timeoutId);
    });

    const postNavigation = document.createElement('div');
    postNavigation.classList.add('post-navigation');
    postNavigation.innerHTML = `
        <div class="like"><ion-icon class="heart" name="heart"></ion-icon></div>
        <div class="coment"><ion-icon name="chatbubble"></ion-icon></div>
        <div class="save"><ion-icon name="bookmark"></ion-icon></div>
    `;

    postElement.appendChild(imgElement);
    postElement.appendChild(postNavigation);
    postElement.appendChild(deleteBtn);

    return postElement;
}

function deletePost(postElement, index) {
    postElement.remove();

    const publishedImages = JSON.parse(localStorage.getItem('publishedImages')) || [];
    publishedImages.splice(index, 1);
    localStorage.setItem('publishedImages', JSON.stringify(publishedImages));
}