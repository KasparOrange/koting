const userBase = 'http://127.0.0.1:3000/api/users';
const imgBase = 'http://127.0.0.1:3000/api/images';

const imgInput = document.querySelector('#img-input');
const addImgBtn = document.querySelector('#add-img');
const userAssign = document.querySelector('#user-assign');
const userDisplay = document.querySelector('#user-display');
const gallery = document.querySelector('#gallery');

const loadUsersToSelection = async () => {
    const response = await fetch(userBase);
    const users = await response.json();

    users.forEach(user => {
        const userOption = document.createElement('option');
        userOption.textContent = user.text;
        userAssign.appendChild(userOption);
        userDisplay.appendChild(userOption.cloneNode(true));
    }
    );
};
loadUsersToSelection();

const addImgToDOM = (img) => {
    const imgBox = document.createElement('div');
    imgBox.className = 'imgBox';
    imgBox.dataset.imgid = img._id;

    const imgItem = document.createElement('img');
    imgItem.src = `${imgBase}/${img._id}`;

    const imgUser = document.createElement('label');
    imgUser.textContent = "From " + img.user;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';

    gallery.appendChild(imgBox);
    imgBox.appendChild(imgItem);
    imgBox.appendChild(imgUser);
    imgBox.appendChild(deleteButton);
}

const loadImages = async () => {
    const response = await fetch(imgBase);
    const images = await response.json();

    images.forEach(img => { addImgToDOM(img) });
}
loadImages();

const addImg = async () => {
    const file = imgInput.files[0];
    imgInput.value = '';
    const user = userAssign.value;

    const formData = new FormData();
    formData.append('image', file); // Append the file with the key 'image'
    formData.append('user', user); // Append the user

    const response = await fetch(imgBase, {
        method: 'POST',
        body: formData
    });

    const newImg = await response.json();
    addImgToDOM(newImg);
};
addImgBtn.addEventListener('click', addImg);

userDisplay.addEventListener('change', () => {
    const selectedUser = userDisplay.value;

    const imgBox = document.querySelectorAll('.imgBox')
    imgBox.forEach(imgBox => {
        const label = imgBox.querySelector('label').textContent;
        const isMatch = label.includes(selectedUser);
        if (selectedUser != "All") {
            imgBox.style.display = isMatch ? 'block' : 'none';
        } else {
            imgBox.style.display = 'block';
        }
    });
});

const deleteImg = async (imgid) => {
    const response = await fetch(`${imgBase}/${imgid}`, {
        method: 'DELETE'
    });
    document.querySelector(`div[data-imgid="${imgid}"]`).remove();
}

gallery.addEventListener('click', (event) => {
    const imgid = event.target.closest('div').dataset.imgid;
    deleteImg(imgid);
});