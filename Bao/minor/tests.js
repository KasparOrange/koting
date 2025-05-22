// console.log((x => x % 2 === 0)(11));

// myFunction = x => (x * 2)
// console.log(myFunction(10))

const numArr = [4, 1, -20, -7, 5, 9, -6];

// numArr.forEach(element => {console.log(element)});


numArr.forEach(element => {
    if (element > 0 || element % 2 === 0) {
        console.log(element);
    }
});

