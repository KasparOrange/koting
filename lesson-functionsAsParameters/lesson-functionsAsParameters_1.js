const express = require('express');
const app = express();
const port = 3000;

app.get('/1', (a, b) => {
    a.send('Hello, World!');
});
    
// // Default route
// app.get('/', myFunction);
 
// function myFunction (req, res) {
//     res.send('Hello, World!');
// }

function thisFunctionTakesAnotherFunction(route, callback) {
    let internalValue1 = 'Hello';
    let internalValue2 = 'World';

    if (typeof callback !== 'function') {
        console.log('Error: callback is not a function. Please provide a function as a callback.');
        return;
    }
    callback(internalValue1, internalValue2);
}

// thisFunctionTakesAnotherFunction("/", (parameter1, parameter2) => {
//     console.log(parameter2 + ', ' + parameter1 + '!');
// });


thisFunctionTakesAnotherFunction("/", (asdlk, askd) => {
    console.log("this is the first paramtert:" + asdlk + ', This is the' + askd + '!')
});