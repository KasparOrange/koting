const userBase = 'http://127.0.0.1:3000/api/users';

const userInput = document.querySelector('#user-input');
const addUserBtn = document.querySelector('#add-user');
const userList = document.querySelector('#user-list');


const addUserToDOM = (user) => {
    const listItem = document.createElement('li');
    listItem.dataset.userid = user._id;

    const listText = document.createElement('span');
    listText.textContent = user.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';

    userList.appendChild(listItem);
    listItem.appendChild(listText);
    listItem.appendChild(deleteButton);
};

const loadUsers = async () => {
    const response = await fetch(userBase);
    const users = await response.json();

    users.forEach(user => { addUserToDOM(user) });
};
loadUsers();

const addUser = async () => {
    const text = userInput.value;
    userInput.value = '';

    const response = await fetch(userBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    const newUser = await response.json();
    addUserToDOM(newUser);
};
addUserBtn.addEventListener('click', addUser);

const deleteUser = async (userid) => {
    // Ask for confirmation before deleting
    if (!confirm("Are you sure you want to delete this user?")) return;

    const response = await fetch(`${userBase}/${userid}`, {
        method: 'DELETE'
    });
    document.querySelector(`li[data-userid="${userid}"]`).remove();
};

userList.addEventListener('click', (event) => {
    const userid = event.target.closest('li').dataset.userid;
    deleteUser(userid);
});