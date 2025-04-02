// SYNCHRONOUS:
let tediousFunction = (x,y) => {
    const result = x**100 / x**98;
    if (y == 1) {console.log ("0. this is logged before the result")};
    return result;
}
// the function is called and nothing else can happen until it returns
console.log("1.", tediousFunction(50,1));
console.log("2. this is logged after the result");


// with .THEN (promise-based and asynchronous)
// requires adjusting the function to return a promise
let tediousPromiseFunction = (x) => {
    const result = new Promise((resolve) => resolve(x**100 / x**98));
    return result;
};
// .then allows the code to continue executing while waiting for the promise to resolve
// this is a callback function that will be called automatically once the promise resolves
tediousPromiseFunction(50).then(result => {console.log("7.", result)});
console.log("3. this is logged before the result");


// with ASYNC/AWAIT (also promise-based and asynchronous):
// async functions return a promise automatically wherever the await keyword is used
let asyncFunction = async () => {
    console.log("8.", await tediousFunction(50,0));
};
// the async function is called but, like above, the code continues executing
// while waiting for the promise to resolve
asyncFunction();
console.log("4. this is logged before the result");


// another .then example with a fech request, which has an in-built promise
fetch('https://api.github.com/zen')
    .then(response => response.text())
    .then(text => {console.log("9.", text)});
console.log("5. this is logged before the result");

// another async/await example with a fech request
// 10. might come before 9. because network requests don't always finish in predictable order
// plus .then execution can be slightly slower
let asyncFetch = async () => {
    const response = await fetch('https://api.github.com/zen');
    console.log("10.", await response.text());
};
asyncFetch();
console.log("6. this is logged before the result");

