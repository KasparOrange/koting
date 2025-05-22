const carCanvas = document.getElementById('carCanvas');
carCanvas.width = 200;
const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = 300;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 100;
const cars = generateCars(N);
let bestCar = cars[0]; // using let because it's changing
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++){
    cars[i].brain = JSON.parse( //parsing the JSON string we saved previously
      localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.2); // degree of mutation
    }
  }
}

// car.update(); // THIS IS REQUIRED BEFORE THE DRAW CALL
// car.draw(ctx); // THE FUCKING CULPRIT

const traffic = [
  new Car(road.getlaneCenter(1), -100, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(0), -250, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(2), -250, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(1), -400, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(0), -550, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(2), -550, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(1), -700, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(0), -850, 30, 50, 'DUMMY', 2),
  new Car(road.getlaneCenter(2), -850, 30, 50, 'DUMMY', 2),
];

animate();

function save() {
  localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getlaneCenter(1), 100, 30, 50, 'AI'));
  }
  return cars;
}

function animate(time) {     // console.log('trying to call car.update')
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);  //the last stays empty so traffic doesn't get damaged
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic); // also calls sensors.update()
  }
  bestCar = cars.find(      // our fitness function
    (c) =>
      c.y ==
      Math.min(
        ...cars.map((c) => c.y) //creating a new array with only the y-values of the cars; the spread ... because the min function doesn't work with an array
      )
  );

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, 'red');
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    // console.log('trying to call car.draw')
    cars[i].draw(carCtx, 'blue'); // also calles sensors.draw()
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, 'blue', true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50; //-to go upward
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}
