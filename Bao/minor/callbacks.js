// #region 1
function myDisplayer(text) {
    console.log(text);
}

myDisplayerFull = (text) => { console.log("The result is: " + text) };

function myCalculator(num1, num2, callback) {
    let sum = num1 + num2;
    callback(sum);
}

// Call myCalculator with myDisplayer as a callback
myCalculator(5, 5, myDisplayer);

// Call myCalculator with myDisplayerFull as a callback
myCalculator(5, 5, myDisplayerFull);

// #endregion 1

// #region 2
const numArr = [4, 1, -20, -7, 5, 9, -6];

// function that selects elements of an array according to a criterion
// and returns a new array. The criterion is a callback function.
// normal function and for loop version:
function selectNum1(arr, criterion) {
    let newArr = [];
    for (let i in arr) {
        if (criterion(arr[i])) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// arrow function and forEach version:
selectNum2 = (arr, criterion) => {
    let newArr = [];
    arr.forEach(element => {
        if (criterion(element)) {
            newArr.push(element);
        }
    });
    return newArr;
}

// call the function with the criterion as a callback
posArr = selectNum1(numArr, (x) => x >= 0);
console.log("posArr: " + posArr);
//using selectNum2 just to show that it works the same
evenArr = selectNum2(numArr, (x) => x % 2 === 0);
console.log("evenArr: " + evenArr);

// #endregion 2
