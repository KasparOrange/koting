const cars = [
    { type: "Volvo", year: 2016 },
    { type: "Saab", year: 2001 },
    { type: "BMW", year: 2010 }
];
console.log("years unordered: " + cars.map(elmt => elmt.year));

cars.sort((elmt, nextElmt) => elmt.year - nextElmt.year);
console.log("years ordered: " + cars.map(element => element.year));

cars.forEach(elmt =>
    console.log("-" + elmt.type + "(" + elmt.year + ")")
);