const myObject = {}; // Empty object

// This shows what is meant with JS being a dynamic language
// You can add properties to an object at any time
// The shape (space in memory) of an object is not fixed

// Dot notation
// Easy to read
// Needs to follow the rules of a valid identifier
myObject.deineMutter = 'Susi';

// Bracket notation
// More cumbersome to read
// Can use any string as a key
myObject['dein Vater'] = 'Peter'; // Has a space in it, not a valid identifier, would not be possible with dot notation

// fake function to get user input
function getUserInput() {
  return 'Some input'; // This would be the user input
}

const userInput = getUserInput();

// Bracket notation is useful when you want to use a user input or a not yet known value as a key
myObject[userInput] = 'Some value';

// --------------------------------------------

console.log(myObject)
// Outputs: [object Object]

console.log(myObject.deineMutter)
// Outputs: Susi

console.log(myObject['dein Vater'])
// Outputs: Peter

console.log(Object.keys(myObject))
// Outputs: [ 'deineMutter', 'deinVater' ]

console.log(Object.values(myObject))
// Outputs: [ 'Susi', 'Peter Hauser' ]

console.log(Object.entries(myObject))
// Outputs: [ [ 'deineMutter', 'Susi' ], [ 'deinVater', 'Peter Hauser' ] ]

console.table(myObject)
// Outputs:
// ┌─────────────┬────────────────┐
// │ (index)     │ Values         │
// ├─────────────┼────────────────┤
// │ deineMutter │ 'Susi'         │
// │ deinVater   │ 'Peter Hauser' │
// └─────────────┴────────────────┘