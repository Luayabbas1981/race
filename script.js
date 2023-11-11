const raceArea = document.querySelector(".race-area");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let mouseX;
let mouseY;
let ballSpeed = 0;
let ballSpeedInterval;
let angle;
let animateId;

// Set screen pixel
const scaleFactor = window.devicePixelRatio;
canvas.width = canvas.clientWidth * scaleFactor;
canvas.height = canvas.clientHeight * scaleFactor;
context.scale(scaleFactor, scaleFactor);

// Ball class
class Ball {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
let initBall = new Ball(
  canvas.width / 2,
  canvas.height - 50,
  canvas.width / 40,
  "#ea1c0d"
);
initBall.draw();
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
let holeSArray = [];
function createHoles() {
  const x = canvas.width;
  /* const y = canvas.height  */
  const width = canvas.width / 12;
  const height = canvas.width / 15;
  for (let index = 0; index < 8; index++) {
    if (index === 0) {
      let hole = new Hole("./images/hole.png", x / 8, 50, width, height);
      hole.id = 3;
      holeSArray.push(hole);
    }
    if (index === 1) {
      let hole = new Hole("./images/hole.png", x / 2.2, 50, width, height);
      hole.id = 3;
      holeSArray.push(hole);
    }
    if (index === 2) {
      let hole = new Hole("./images/hole.png", x / 1.3, 50, width, height);
      hole.id = 3;
      holeSArray.push(hole);
    }
    if (index === 3) {
      let hole = new Hole("./images/hole.png", x / 7, 160, width, height);
      hole.id = 2;
      holeSArray.push(hole);
    }
    if (index === 4) {
      let hole = new Hole("./images/hole.png", x / 2.8, 160, width, height);
      hole.id = 2;
      holeSArray.push(hole);
    }
    if (index === 5) {
      let hole = new Hole("./images/hole.png", x / 1.6, 160, width, height);
      hole.id = 2;
      holeSArray.push(hole);
    }
    if (index === 6) {
      let hole = new Hole("./images/hole.png", x / 4, 270, width, height);
      hole.id = 1;
      holeSArray.push(hole);
    }
    if (index === 7) {
      let hole = new Hole("./images/hole.png", x / 1.4, 270, width, height);
      hole.id = 1;
      holeSArray.push(hole);
    }
  }
}
createHoles();
let ball;
// You should populate this array with Hole objects

// Set Speed function
canvas.addEventListener("pointerdown", function (event) {
  angle = Math.atan2(
    event.clientY - (canvas.height - 50),
    event.clientX - canvas.width
  );

  ballSpeedInterval = setInterval(() => {
    ballSpeed++;
  }, 100);
});

// Animate function
canvas.addEventListener("pointerup", function () {
  const velocity = {
    x: Math.cos(angle) * ballSpeed,
    y: Math.sin(angle) * ballSpeed,
  };

  clearInterval(ballSpeedInterval);

  // Create the ball object only once
  ball = new Ball(
    canvas.width / 2,
    canvas.height - 50,
    canvas.width / 40,
    "#ea1c0d",
    velocity
  );

  function animate() {
    animateId = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    holeSArray.forEach((hole) => hole.draw());
    ball.update();
  }

  animate();
  ballSpeed = 0;
});
