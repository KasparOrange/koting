const emptyArray = [];

// creates array 0-10
for (let i = 0; i < 11; i++) {
    emptyArray[i] = i;
};


// creates new array and puts the elements of emptyArray in reverse order into it
const reverseArray = [];

for ( i = 0; i < emptyArray.length /*or: emptyArray[i]*/; i++) {
    reverseArray[i] = emptyArray[emptyArray.length-(1+i)];
};

// console.table(reverseArray);


// S:
const hundredArray = [];
for (let i = 0; i < 100; i++){
    hundredArray[i] = i+1;
};

// console.table(hundredArray);

//B:

const fiverArray = [];

for (let i = 1; i < hundredArray.length/5; i++){
    fiverArray[i-1] = hundredArray[i*5-1];
};

// console.table(fiverArray);

// ----------------------------

// Make an array of 100 elements, each element being the index of the element in the array
const kArray1 = [];
for (let i = 0; i < 100; i++) {
    kArray1[i] = i;
}

console.table(kArray1);

for (let i = 0; i < kArray1.length; i++) {
    if (i % 5 == 0) {
        setTimeout(() => {
            console.log(kArray1[i]);
        }, 1000);
    }
}
