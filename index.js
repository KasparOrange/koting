function add(a, b, d) {
  return a + b;
}

function multi(a, b) {
  return a * b;
}

function divi(a, b) {
    return a / b;
}

function pot(a, b){
    return a ** b
}

const a = 5;
const b = 5;
const c = 10;

console.log('??');

// keyword name (parameters){
//     return operation
// }

const sum = add(a, add(multi(2, 2), 3));
const labikrabi = multi(a, b);
const potency = pot(a,b)

console.log(sum);
console.log(labikrabi);
console.log(potency)
