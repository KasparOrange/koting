const myArray = [1, 2, 3, 4, 5];

let myString = 'Bla';

let myObject = { name: 'John', age: 30 };

let seventeen = 17;

seventeen.toPrecision(2);

const myMixedArray = [1, 2, 'Peter', 4, 5]; // This only works in JavaScript

console.log(typeof myMixedArray); // We don't need this most of the time.

console.log(Array.isArray(myMixedArray));

function myFunction(thisShouldBeAString) {
  if (typeof thisShouldBeAString === 'string') {
    return thisShouldBeAString;
  } else {
    console.error('This is not a string!');
  }
}

console.log(myFunction(0));

const bArray = [3, 2, 1];

const a = "a";
const b = "b";
const c = "c";
const sArray = [a, b, c];

const ever = 7 ;

// const bObject = { one: 3, two: 2, three: 1, test: "string" };
const sObject = { what: ever, is: 'that', here: "?" };


// console.table(bArray);
// console.table(bObject);

const inhabitants = [
  { name: 'Franz', children: ['Lisa', 'Maria'], age:39},
  { name: 'Jonas', children: ['Klaus', 'Sabrina'], age:44},
  17,
  'string',
];

console.table(inhabitants);

let myNumber = new Number(23);

// myNumber = myNumber.valueOf();

console.log(typeof myNumber);

console.log(typeof myNumber + 1);   

let myUndefinedVariable;

const myArrayOfUndefined = [undefined, myUndefinedVariable];

console.table(myArrayOfUndefined);

console.table(sArray);













// const constantNumber = 8;

// constantNumber = 9;

const constantArray = [1, 2, 3];

constantArray[0] = 4;

constantArray = [4, 5, 6];



constantArray.push(4);

