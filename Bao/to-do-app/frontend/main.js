const input = document.querySelector('#new-task');
const button = document.querySelector('#add-task');
const list = document.querySelector('#task-list');
const url = 'http://127.0.0.1:3000/api/items';

const addTaskToDOM = (task) => {
    const listItem = document.createElement('li');
    // store the database id as data attribute of each list item
    listItem.dataset.DOMid = task._id;
    if (task.completed) { listItem.className = 'completed' };
    const listText = document.createElement('span');
    listText.textContent = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';
    const completeButton = document.createElement('button');
    completeButton.className = 'completeButton';
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';

    list.appendChild(listItem);
    listItem.appendChild(listText);
    listItem.appendChild(deleteButton);
    listItem.appendChild(completeButton);
};

const loadTasks = async () => {
    const response = await fetch(url);
    const tasks = await response.json(); // why wait again?

    tasks.forEach(task => { addTaskToDOM(task) });
};
loadTasks();

const addTask = async () => {
    const text = input.value; //make conditional on input.value not being empty?
    input.value = '';

    const response = await fetch(url, {
        method: 'POST',
        // This tells the server that you're sending JSON data in the request body.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, completed: false }) // Send the new item as JSON
    });

    const newTask = await response.json();
    addTaskToDOM(newTask);
};
button.addEventListener('click', addTask);

const deleteTask = async (DOMid) => {
    const response = await fetch(`${url}/${DOMid}`, {
        method: 'DELETE'
    });
    // DOM got converted to -d-o-m, see HTML source code 
    document.querySelector(`li[data--d-o-mid="${DOMid}"]`).remove();
}

const completeTask = async (DOMid) => {
    const listItem = document.querySelector(`li[data--d-o-mid="${DOMid}"]`);
    const completeButton = listItem.querySelector('.completeButton');

    if (listItem.className !== 'completed') {  // if it's not yet completed
        const response = await fetch(`${url}/${DOMid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        });

        listItem.className = 'completed';
        completeButton.textContent = 'Undo';
    } else { // to undo, if it's already completed 
        const response = await fetch(`${url}/${DOMid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: false })
        });

        listItem.classList.remove('completed');
        completeButton.textContent = 'Complete';
    }
}

list.addEventListener('click', (event) => {
    const DOMid = event.target.closest('li').dataset.DOMid;

    switch (event.target.className) {
        case 'deleteButton':
            deleteTask(DOMid);
            break;
        case 'completeButton':
            completeTask(DOMid);
            break;
    }
});