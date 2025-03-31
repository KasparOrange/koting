try {
    // const addBtn = document.getElementById('add-btn');
    // addBtn.addEventListener(('click', () => {
    //     addItem();
    // }));

    const response = await fetch('http://127.0.0.1:3000/api/items');
    const items = await response.json();

    const taskList = document.getElementById('task-list');

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
    
    // Display the tasks
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

// app.delete('/api/items/:id', async (req, res) => {
//   try {
//     const id = req.params.id;

//     const result = await db.collection(collectionName).deleteOne(
//       { _id: new ObjectId(id) }  // Delete by MongoDB _id
//     );

//     res.json({ deletedCount: result.deletedCount }); // How many documents were deleted
//   } catch (err) {
//     console.error('Error deleting item:', err);
//     res.status(500).json({ error: 'Failed to delete item' });
//   }
// });