const myObj = {
    name: "John",
    age: 30,
    cars: [
        { name: "Ford", models: ["Fiesta", "Focus", "Mustang"] },
        { name: "BMW", models: ["320", "X3", "X5"] },
        { name: "Fiat", models: ["500", "Panda"] },
        { name: "Skoda", models: ["Octavia", "Superb"] }
    ]
}

// Print out the name of the person and all the car brands they like.
console.log(
    myObj.name +
    "'s favourite car brands are " +
    myObj.cars.map(element => element.name).slice(0,-1).join(", ") +
    ", and "
    + myObj.cars[myObj.cars.length - 1].name + "."
);