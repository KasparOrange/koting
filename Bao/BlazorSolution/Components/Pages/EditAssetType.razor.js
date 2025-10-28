export function initialize(_dotNetRef) {
    const dropZones = document.querySelectorAll('[data-asset-type]');
    const draggables = document.querySelectorAll('[data-asset-name]');

    dropZones.forEach((dropZone) => {
        // enable dropping on columns
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        // ondrop: append draggedItem
        dropZone.addEventListener('drop', async (e) => {
            const draggedElement = document.querySelector('.draggedElement');
            
            dropZone.appendChild(draggedElement);
            
            await _dotNetRef.invokeMethodAsync("OnItemDroppedAsync", draggedElement.dataset.assetName, dropZone.dataset.assetType);
        })
    });
    
    // add temporary id to dragged element
    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('draggedElement');
        })

        draggable.addEventListener("dragend", (e) => {
            draggable.classList.remove('draggedElement');
        });
    });
}


















// NOTE: MDN Code
    const columns = document.querySelectorAll(".task-column");
    const tasks = document.querySelectorAll(".task");

    columns.forEach((column) => {
        // enable dropping on columns
        column.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        // call movePlaceholder to update placeholder position
        column.addEventListener("dragover", movePlaceholder);

        // remove the placeholder on dragleave unless it's moving into a child
        column.addEventListener("dragleave", (event) => {
            // If we are moving into a child element, we aren't actually leaving the column
            if (column.contains(event.relatedTarget)) return;
            const placeholder = column.querySelector(".placeholder");
            placeholder?.remove();
        });

        // ondrop: remove task from old position and insert before placeholder, remove placeholder
        column.addEventListener("drop", (event) => {
            const draggedTask = document.getElementById("dragged-task");
            const placeholder = column.querySelector(".placeholder");
            if (!placeholder) return;
            draggedTask.remove();
            column.children[1].insertBefore(draggedTask, placeholder);
            placeholder.remove();
        });
    });

// enable moving tasks and define them as dataTransfer data
// set an id only for the duration of the drag
    tasks.forEach((task) => {
        task.addEventListener("dragstart", (event) => {
            task.id = "dragged-task";
            event.dataTransfer.effectAllowed = "move";
            // Custom type to identify a task drag
            event.dataTransfer.setData("task", "");
        });

        task.addEventListener("dragend", (event) => {
            task.removeAttribute("id");
        });
    });


    function makePlaceholder(draggedTask) {
        const placeholder = document.createElement("li");
        placeholder.classList.add("placeholder");
        placeholder.style.height = `${draggedTask.offsetHeight}px`;
        return placeholder;
    }

    function movePlaceholder(event) {
        const column = event.currentTarget;
        const draggedTask = document.getElementById("dragged-task");
        const tasks = column.children[1];
        const existingPlaceholder = column.querySelector(".placeholder");
        if (existingPlaceholder) {
            const placeholderRect = existingPlaceholder.getBoundingClientRect();
            if (
                placeholderRect.top <= event.clientY &&
                placeholderRect.bottom >= event.clientY
            ) {
                return;
            }
        }
        for (const task of tasks.children) {
            if (task.getBoundingClientRect().bottom >= event.clientY) {
                if (task === existingPlaceholder) return;
                existingPlaceholder?.remove();
                if (task === draggedTask || task.previousElementSibling === draggedTask)
                    return;
                tasks.insertBefore(
                    existingPlaceholder ?? makePlaceholder(draggedTask),
                    task,
                );
                return;
            }
        }
        existingPlaceholder?.remove();
        if (tasks.lastElementChild === draggedTask) return;
        tasks.append(existingPlaceholder ?? makePlaceholder(draggedTask));
    }

// export function initialize(draggable, dropZone) {
//     // Drag start - when dragging begins
//     draggable.addEventListener('dragstart', (e) => {
//         e.dataTransfer.effectAllowed = 'move';
//         draggable.classList.add('dragging');
//         console.log('Drag started', { element: draggable , items: e.dataTransfer.items });
//        
//         console.log('DataTransferItemCount:', { count: e.dataTransfer.items.length });
//        
//         for (const item of e.dataTransfer.items) {
//             console.log('DataTransferItem:', item);
//         }
//     });
//
//     // Drag - fires continuously while dragging
//     draggable.addEventListener('drag', (e) => {
//         draggable.classList.add('drag-active');
//         // console.log('Dragging', { x: e.clientX, y: e.clientY });
//     });
//
//     // Drag end - when dragging stops (dropped or cancelled)
//     draggable.addEventListener('dragend', (e) => {
//         draggable.classList.remove('dragging', 'drag-active');
//         dropZone.classList.remove('drag-over', 'drag-entered');
//         console.log('Drag ended', { x: e.clientX, y: e.clientY });
//     });
//
//     // Drag enter - when draggable first enters drop zone
//     dropZone.addEventListener('dragenter', (e) => {
//         e.preventDefault();
//         dropZone.classList.add('drag-entered');
//         console.log('Drag entered drop zone', { target: e.target });
//     });
//
//     // Drag over - fires continuously while over drop zone
//     dropZone.addEventListener('dragover', (e) => {
//         e.preventDefault();
//         e.dataTransfer.dropEffect = 'move';
//         dropZone.classList.add('drag-over');
//         // console.log('Dragging over drop zone', { x: e.clientX, y: e.clientY });
//     });
//
//     // Drag leave - when draggable leaves drop zone
//     dropZone.addEventListener('dragleave', (e) => {
//         e.preventDefault();
//         dropZone.classList.remove('drag-over', 'drag-entered');
//         console.log('Drag left drop zone', { target: e.target });
//     });
//
//     // Drop - when dropped on drop zone
//     dropZone.addEventListener('drop', (e) => {
//         e.preventDefault();
//         dropZone.classList.remove('drag-over', 'drag-entered');
//         dropZone.classList.add('dropped');
//         console.log('Dropped on drop zone', { x: e.clientX, y: e.clientY });
//
//         dropZone.appendChild(draggable);
//         // e.target.append(draggable);
//
//         // Remove dropped class after animation
//         setTimeout(() => {
//             dropZone.classList.remove('dropped');
//             console.log('Drop animation completed');
//         }, 300);
//     });
// }