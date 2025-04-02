const input = document.querySelector('#new-task');
const button = document.querySelector('#add-task');
const list = document.querySelector('#task-list');
const url = 'http://127.0.0.1:3000/api/items';

const fetchTasks = async () => {
    const response = await fetch(url);
    const items = await response.json();

    items.forEach(item => {
        // shortest version but XSS risk, slower;
        // alternative: .createElement & .appendChild
        list.innerHTML += `<li><span>${item.text}</span></li>`;
    });
};
fetchTasks();

const addTask = async () => {
    const text = input.value;
    input.value = '';
    list.innerHTML += `<li><span>${text}</span></li>`;
    
    const response = await fetch(url, {
        method: 'POST',
        // This tells the server that you're sending JSON data in the request body.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }) // Send the new item as JSON
    });
};
button.addEventListener('click', addTask);

// deleteTask
// completeTask

// add another sentence to the message element, change its style, and remove it (DOM practice)
const messageAdjunct = document.createTextNode(' It was fun to make :)');
const messageElement = document.querySelector('#message');
messageElement.appendChild(messageAdjunct);
messageElement.style.color = 'orange';
// remove it again
messageAdjunct.remove();
// remove it again (longer variant)
// messageElement.removeChild(messageElement.childNodes[0]);

