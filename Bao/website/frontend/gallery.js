const userBase = 'http://127.0.0.1:3000/api/users';

const userAssign = document.querySelector('#user-assign');
const userDisplay = document.querySelector('#user-display');

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