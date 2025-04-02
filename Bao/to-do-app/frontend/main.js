try {
    const response = await fetch('http://127.0.0.1:3000/api/items');
    const items = await response.json();

    const taskList = document.querySelector('#task-list');

    items.forEach(item => {
        const newLiElement = document.createElement('li');

        const newTextElement = document.createElement('p');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteItem(item._id);
            newLiElement.remove();
        });
        newLiElement.appendChild(deleteButton);

        newTextElement.textContent = item.text;

        newLiElement.appendChild(newTextElement);

        taskList.appendChild(newLiElement);
    });

    console.log(items);
} catch (error) {
    console.error('Error fetching tasks:', error);
}

export async function addItem() {
    const text = document.getElementById('new-task').value;

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text }) // Send the new item as JSON
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        console.log('Created item:', data);
    } catch (error) {
        console.error('Error creating item:', error);
    }
}

window.addItem = addItem;

async function deleteItem(id) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        console.log('Created item:', data);
    } catch (error) {
        console.error('Error creating item:', error);
    }
}

// add another sentence to the message element, change its style, and remove it (DOM practice)
const messageAdjunct = document.createTextNode(' It was fun to make :)');
const messageElement = document.querySelector('#message');
messageElement.appendChild(messageAdjunct);
messageElement.style.color = 'orange';
// remove it again
messageAdjunct.remove();
// remove it again (longer variant)
// messageElement.removeChild(messageElement.childNodes[0]);

// #region MDN version to update shopping list (without database)
// const list = document.querySelector('ul');
// const input = document.querySelector('input');
// const button = document.querySelector('button');

// button.addEventListener('click', () => {
//   const myItem = input.value;
//   input.value = '';

//   const listItem = document.createElement('li');
//   const listText = document.createElement('span');
//   const listBtn = document.createElement('button');

//   listItem.appendChild(listText);
//   listText.textContent = myItem;
//   listItem.appendChild(listBtn);
//   listBtn.textContent = 'Delete';
//   list.appendChild(listItem);

//   listBtn.addEventListener('click', () => {
//     list.removeChild(listItem);
//   });

//   input.focus();
// });
// #endregion