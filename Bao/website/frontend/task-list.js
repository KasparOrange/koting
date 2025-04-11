const taskBase = 'http://127.0.0.1:3000/api/tasks';
const userBase = 'http://127.0.0.1:3000/api/users';

const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task');
const userSelection = document.querySelector('#user-selection');
const taskList = document.querySelector('#task-list');

const loadUsersToSelection = async () => {
    const response = await fetch(userBase);
    const users = await response.json();

    users.forEach(user => {
        const userOption = document.createElement('option');
        userOption.textContent = user.text;
        userSelection.appendChild(userOption);
    }
    );
};
loadUsersToSelection();


const addTaskToDOM = (task) => {
    const listItem = document.createElement('li');
    listItem.dataset.taskid = task._id;
    if (task.completed) { listItem.className = 'completed' };

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = task.completed;

    const listText = document.createElement('span');
    listText.textContent = task.user + ': ' + task.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';

    taskList.appendChild(listItem);
    listItem.appendChild(checkbox);
    listItem.appendChild(listText);
    listItem.appendChild(deleteButton);
};

const loadTasks = async () => {
    const response = await fetch(taskBase);
    const tasks = await response.json(); // why wait again?

    tasks.forEach(task => { addTaskToDOM(task) });
};
loadTasks();


const addTask = async () => {
    const text = taskInput.value;
    taskInput.value = '';

    const user = userSelection.value;

    const response = await fetch(taskBase, {
        method: 'POST',
        // This tells the server that you're sending JSON data in the request body.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, completed: false, user }) // Send the new item as JSON
    });

    const newTask = await response.json();
    addTaskToDOM(newTask);
};
addTaskBtn.addEventListener('click', addTask);

const deleteTask = async (taskid) => {
    const response = await fetch(`${taskBase}/${taskid}`, {
        method: 'DELETE'
    });
    // DOM got converted to -d-o-m, see HTML source code 
    document.querySelector(`li[data-taskid="${taskid}"]`).remove();
}

const completeTask = async (taskid) => {
    const listItem = document.querySelector(`li[data-taskid="${taskid}"]`);
    const completeButton = listItem.querySelector('.completeButton');

    if (listItem.className !== 'completed') {  // if it's not yet completed
        const response = await fetch(`${taskBase}/${taskid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        });

        listItem.className = 'completed';
    } else { // to undo, if it's already completed 
        const response = await fetch(`${taskBase}/${taskid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: false })
        });

        listItem.classList.remove('completed');
    }
}

taskList.addEventListener('click', (event) => {
    const taskid = event.target.closest('li').dataset.taskid;

    switch (event.target.className) {
        case 'deleteButton':
            deleteTask(taskid);
            break;
        case 'checkbox':
            completeTask(taskid);
            break;
    }
});
