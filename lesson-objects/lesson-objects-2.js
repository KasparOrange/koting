

const container = {
    trash: "Today, the container is full of ",
    flipMeOff: function (x) {  
        return this.trash + x + "!!";
    }
};


container.description = "sings";
container.color = "blue";

console["log"](container.flipMeOff("bananas and bitches"));

console.newObject = "test";

console.log(console.newObject);

console.table(console);

console.warn(console);

console.warn("this is a warning");

console.error("this is and error");