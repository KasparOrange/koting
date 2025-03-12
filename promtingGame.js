const prompt = require('prompt-sync')() 

// Function declaration
// function output(parameter) {
//     console.log(parameter)
// }

const currentYear = 2024

const name = prompt('What is your name? ')

// console.log('Hello ' + name + '!')

const age = prompt('What is your age? ')

console.log(name + ', you are ' + age + ' years old')
console.log(name + ' was born in the year ' + (currentYear - age))
