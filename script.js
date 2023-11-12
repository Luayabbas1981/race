const playArea = document.querySelector(".play-area");
const raceArea = document.querySelector(".race-area");
const player = document.querySelector(".player");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let mouseX;
let mouseY;
let ballSpeed = 0;
let ballSpeedInterval;
let angle;
let animateId;

// Canvas demistions

canvas.width= playArea.offsetWidth
canvas.height= playArea.offsetHeight

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
    // Check if the ball reaches the right or left boundary of the canvas
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x; // Reverse the x-direction
    }

    // Check if the ball reaches the top or bottom boundary of the canvas
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y; // Reverse the y-direction
    }
    const friction = 0.99; // Adjust this value to control the rate of speed reduction
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
let initBall = new Ball(
  canvas.width / 2,
  canvas.height - 50,
  20,
  "#ea1c0d"
);
initBall.draw();
// Hole class
class Hole {
  constructor(x, y, radius, color, number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.number = number;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    // Draw the number in the middle
    context.fillStyle = "#df0b0b"; // Set the color for the text
    context.font = "16px Arial"; // Set the font size and family
    context.textAlign = "center"; // Center the text horizontally
    context.textBaseline = "middle"; // Center the text vertically
    context.fillText(this.number, this.x, this.y);
  }
}
let holeSArray = [];
function createHoles() {
  const x = canvas.width;
  const radius = 30;
  const color = "white";

  for (let index = 0; index < 8; index++) {
    if (index === 0) {
      let hole = new Hole(x / 8, 50, radius, color, 6);
      holeSArray.push(hole);
    }
    if (index === 1) {
      let hole = new Hole(x / 2.2, 50, radius, color, 5);
      holeSArray.push(hole);
    }
    if (index === 2) {
      let hole = new Hole(x / 1.3, 50, radius, color, 4);
      holeSArray.push(hole);
    }
    if (index === 3) {
      let hole = new Hole(x / 7, 160, radius, color, 2);
      holeSArray.push(hole);
    }
    if (index === 4) {
      let hole = new Hole(x / 2.8, 160, radius, color, 1);
      holeSArray.push(hole);
    }
    if (index === 5) {
      let hole = new Hole(x / 1.6, 160, radius, color, 3);
      holeSArray.push(hole);
    }
    if (index === 6) {
      let hole = new Hole(x / 4, 270, radius, color, 8);
      holeSArray.push(hole);
    }
    if (index === 7) {
      let hole = new Hole(x / 1.4, 270, radius, color, 7);
      holeSArray.push(hole);
    }
  }
  holeSArray.forEach((hole) => hole.draw());
}
createHoles();
let ball;
// You should populate this array with Hole objects

// Set Speed function
canvas.addEventListener("pointerdown", function (event) {
  ballSpeed = 0;

  angle = Math.atan2(
    event.clientY - canvas.height -50,
    event.clientX - canvas.width /2
  );

  ballSpeedInterval = setInterval(() => {
    ballSpeed++;
  }, 50);
});

// Animate function
canvas.addEventListener("pointerup", function () {
  const stopThreshold = 0.1;
  const velocity = {
    x: Math.cos(angle) * ballSpeed,
    y: Math.sin(angle) * ballSpeed,
  };

  clearInterval(ballSpeedInterval);

  // Create the ball object only once
  ball = new Ball(
    canvas.width / 2,
    canvas.height - 50,
    20,
    "#ea1c0d",
    velocity
  );

  function animate() {
    animateId = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    holeSArray.forEach((hole) => {
      hole.draw();
      const dist = Math.hypot(ball.x - hole.x, ball.y - hole.y);
      if (dist - ball.radius - hole.radius < 1) {
        hole.color = "green";
        player.style.transform=`translateY(${hole.number *-10}px)`
        setTimeout(() => {
          cancelAnimationFrame(animateId);
        }, 20);
      }
    });
    ball.update();
    if (
      Math.abs(ball.velocity.x) < stopThreshold &&
      Math.abs(ball.velocity.y) < stopThreshold
    ) {
      cancelAnimationFrame(animateId);
      setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        holeSArray.forEach((hole) => hole.draw());
        let endRoundBall = new Ball(
          canvas.width / 2,
          canvas.height - 50,
          20,
          "#ea1c0d"
        );
        endRoundBall.draw();
      }, 700);
    }
  }

  animate();
});
