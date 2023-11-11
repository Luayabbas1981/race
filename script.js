const raceArea = document.querySelector(".race-area");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let mouseX;
let mouseY;
let ballSpeed = 0;
let ballSpeedInterval;
// Set screen pixel
const scaleFactor = window.devicePixelRatio;
canvas.width = canvas.clientWidth * scaleFactor;
canvas.height = canvas.clientHeight * scaleFactor;
context.scale(scaleFactor, scaleFactor);


// Ball class

class Ball {
  constructor(ballSrc, x, y, width, height,velocity) {
    this.ball = new Image();
    this.ball.src = ballSrc;
    this.ball.onload = () => {
      this.draw(); // Call draw() once the image is loaded
    };
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = this.id;
    this.rect = this.rect;
    this.velocity = velocity;
  }

  draw() {
    context.drawImage(this.ball, this.x, this.y, this.width, this.height);
  }
  update(){
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
let hole = new Ball("./images/ball.png", canvas.width/2 -30, canvas.height -70, 60, 60);
// Hole class
class Hole {
  constructor(holeSrc, x, y, width, height) {
    this.hole = new Image();
    this.hole.src = holeSrc;
    this.hole.onload = () => {
      this.draw(); // Call draw() once the image is loaded
    };
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = this.id;
    this.rect = this.rect;
  }

  draw() {
    context.drawImage(this.hole, this.x, this.y, this.width, this.height);
  }
}
let holeSArray =[]
function createHoles() {
  for (let index = 0; index < 8; index++) {
    if(index===0){
      let hole = new Hole("./images/hole.png", 60, 50, 80, 70);
      hole.id = index;
      holeSArray.push(hole)
    }
    if(index===1 || index===2){
      let hole = new Hole("./images/hole.png", index  * 280, 50, 80, 70);
      hole.id = index;
      holeSArray.push(hole)
    }
    if(index===3){
      let hole = new Hole("./images/hole.png", 90, 140, 80, 70);
      hole.id = index;
      holeSArray.push(hole)
    }
    if(index===4 || index===5 ){
      let hole = new Hole("./images/hole.png", (index -3) *270,160, 80, 70);
      hole.id = index;
      holeSArray.push(hole)
    }
    if(index===6 || index===7 ){
      let hole = new Hole("./images/hole.png", (index -5) *200,270, 80, 70);
      hole.id = index;
      holeSArray.push(hole)
    }
   
  }
}
createHoles();
let AnimateId 
// Speed Handler function
function setSpeed() {
  ballSpeedInterval= setInterval(() => {  
    ballSpeed++;
  }, 100);
  
}
// Set Speed function 
canvas.addEventListener("pointerdown",setSpeed)

// Animate function
function animateBall(){
  clearInterval(ballSpeedInterval)
  // speed = 0
}
canvas.addEventListener