// #region USER-POPUP
// #users-popup {
//     display: none;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: white;
//     border: 1px solid black;
//     padding: 20px;
//     z-index: 2;
//   }
  
//   #overlay {
//     display: none;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     backdrop-filter: blur(5px);
//     z-index: 1;
//   }

// <div id="users-popup">   
// </div>

// <div id="overlay"></div>

const openPopup = () => {
    editUserPopup.style.display = 'block';
    overlay.style.display = 'block';
};
editUsersBtn.addEventListener('click', openPopup); 

const closePopup = () => {
    editUserPopup.style.display = 'none';
    overlay.style.display = 'none';
};
doneEditBtn.addEventListener('click', closePopup);
// #endregion

