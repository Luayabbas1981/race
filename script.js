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
// Set screen dimensions
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;
// Set ballArea dimensions
const raceAreaHeight = raceArea.offsetHeight;
const raceAreaWidth = raceArea.offsetWidth;
// Get canvas position in page
const canvasRect = canvas.getBoundingClientRect();
// Add game images
const ball = new Image();
ball.src = "./images/ball.png";
let ballX = canvas.width / 2;
let ballY = canvas.height - 60;
const firstHole = new Image();
firstHole.src = "./images/hole.png";
const secondHole = new Image();
secondHole.src = "./images/hole.png";
const thirdHole = new Image();
thirdHole.src = "./images/hole.png";
const fourthHole = new Image();
fourthHole.src = "./images/hole.png";
const fifthHole = new Image();
fifthHole.src = "./images/hole.png";

window.onload = function () {
  context.drawImage(ball, ballX, ballY, 50, 50);
  context.drawImage(firstHole, canvas.width/10, canvas.height/16, canvas.width/10, canvas.height/12);
  context.drawImage(secondHole, canvas.width/2.3, canvas.height/16, canvas.width/10, canvas.height/12)
  context.drawImage(thirdHole, canvas.width/1.3, canvas.height/16, canvas.width/10, canvas.height/12);
  context.drawImage(fourthHole, canvas.width/6, canvas.height/5, canvas.width/10, canvas.height/12);
  context.drawImage(fifthHole, canvas.width/2, canvas.height/5, canvas.width/10, canvas.height/12); 
};
//Ball position
 
// Set speed
/* function setSpeed() {
  ballSpeed++;
  console.log("ballSpeed", ballSpeed *3);
}
canvas.addEventListener("pointerdown", function (event) {
  ballSpeedInterval = setInterval(setSpeed, 1);
  mouseX = event.clientX - canvasRect.left;
  mouseY = event.clientY - canvasRect.top;
  console.log("mouseX", mouseX, ballX);
  console.log("mouseY", mouseY, ballY);
});
canvas.addEventListener("pointerup", function () {
  clearInterval(ballSpeedInterval);
  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, raceAreaWidth, raceAreaHeight);
    context.drawImage(ball, ballX, -ballY, 50, 50);
  }
});
 */