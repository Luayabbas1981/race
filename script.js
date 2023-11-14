const raceArea = document.querySelector(".race-area");
const finishLine = document.querySelector(".finish-line img");
const round = document.querySelector(".rounds span");
const info = document.querySelector(".steps span");
const ballSpeedInfo = document.querySelector(".ball-speed span")
const playArea = document.querySelector(".play-area");
const player = document.querySelector(".player");
const raceCanvas = document.getElementById("raceCanvas");
const playerCanvas = document.getElementById("playerCanvas");
const raceContext = raceCanvas.getContext("2d");
const playerContext = playerCanvas.getContext("2d");
let mouseX;
let mouseY;
let playerPosition;
let ballSpeed = 0;
let rounds = 0;
let steps = 0;
let ballSpeedInterval;
let angle;
let animateId;

// raceCanvas
raceCanvas.width = raceArea.offsetWidth;
raceCanvas.height = raceArea.offsetHeight;
const finishLinePosition = finishLine.getBoundingClientRect();

playerPosition = player.getBoundingClientRect();
const linesNumber = parseInt(
  (raceCanvas.height -
    finishLinePosition.top / 2 -
    (playerPosition.bottom - playerPosition.top)) /
    14
);

function drawLines() {
  for (let i = 0; i < linesNumber - 1; i++) {
    raceContext.strokeStyle = "white";
    raceContext.lineWidth = 1;
    raceContext.beginPath();
    raceContext.moveTo(
      30,
      raceCanvas.height - (playerPosition.bottom - playerPosition.top + i * 14)
    );
    raceContext.lineTo(
      raceCanvas.width,
      raceCanvas.height - (playerPosition.bottom - playerPosition.top + i * 14)
    );
    raceContext.stroke();
    raceContext.closePath();
    raceContext.fillStyle = "black"; // Set the color of the text
    raceContext.font = "14px Arial"; // Set the font size and family
    raceContext.fillText(
      i,
      15,
      raceCanvas.height -
        (playerPosition.bottom - playerPosition.top) -
        i * 14 +
        5
    );
  }
}
drawLines();
// PlayerCanvas

playerCanvas.width = playArea.offsetWidth;
playerCanvas.height = playArea.offsetHeight;
//

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
    playerContext.beginPath();
    playerContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    playerContext.fillStyle = this.color;
    playerContext.fill();
  }

  update() {
    this.draw();
    // Check if the ball reaches the right or left boundary of the playerCanvas
    if (this.x + this.radius > playerCanvas.width || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x; // Reverse the x-direction
    }

    // Check if the ball reaches the top or bottom boundary of the playerCanvas
    if (
      this.y + this.radius > playerCanvas.height ||
      this.y - this.radius < 0
    ) {
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
  playerCanvas.width / 2,
  playerCanvas.height - 50,
  20,
  "#0014c3"
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
    playerContext.beginPath();
    playerContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    playerContext.fillStyle = this.color;
    playerContext.fill();
    // Draw the number in the middle
    playerContext.fillStyle = "#ffffff"; // Set the color for the text
    playerContext.font = "24px Arial"; // Set the font size and family
    playerContext.textAlign = "center"; // Center the text horizontally
    playerContext.textBaseline = "middle"; // Center the text vertically
    playerContext.fillText(this.number, this.x, this.y);
  }
}
let holeSArray = [];
function createHoles() {
  const x = playerCanvas.width;
  const radius = 30;
  const color = "#3196c7";

  for (let index = 0; index < 8; index++) {
    if (index === 0) {
      let hole = new Hole(x / 8, 80, radius, color, 6);
      holeSArray.push(hole);
    }
    if (index === 1) {
      let hole = new Hole(x / 2.2, 80, radius, color, 7);
      holeSArray.push(hole);
    }
    if (index === 2) {
      let hole = new Hole(x / 1.3, 80, radius, color, 8);
      holeSArray.push(hole);
    }
    if (index === 3) {
      let hole = new Hole(x / 5, 220, radius, color, 5);
      holeSArray.push(hole);
    }
    if (index === 4) {
      let hole = new Hole(x / 2, 220, radius, color, 3);
      holeSArray.push(hole);
    }
    if (index === 5) {
      let hole = new Hole(x / 1.3, 220, radius, color, 4);
      holeSArray.push(hole);
    }
    if (index === 6) {
      let hole = new Hole(x / 4, 350, radius, color, 1);
      holeSArray.push(hole);
    }
    if (index === 7) {
      let hole = new Hole(x / 1.4, 350, radius, color, 2);
      holeSArray.push(hole);
    }
  }
  holeSArray.forEach((hole) => hole.draw());
}
createHoles();
let ball;
// You should populate this array with Hole objects

// Set Speed function
playArea.addEventListener("pointerdown", function (event) {
  ballSpeed = 0;
  if (event.clientX < window.innerWidth / 2 + raceArea.offsetWidth) {
    angle = Math.atan2(
      event.clientY -
        playerCanvas.height +
        100 -
        (window.innerHeight - raceArea.offsetHeight),
      event.clientX - playerCanvas.width - raceArea.offsetWidth - 100
    );
  } else {
    angle = Math.atan2(
      event.clientY -
        playerCanvas.height +
        100 -
        (window.innerHeight - raceArea.offsetHeight),
      event.clientX - playerCanvas.width - raceArea.offsetWidth
    );
  }

  ballSpeedInterval = setInterval(() => {
    ballSpeed++;
    ballSpeedInfo.textContent= ballSpeed
    if (ballSpeed === 35) {
      clearInterval(ballSpeedInterval);
    }
    console.log(ballSpeed);
  }, 50);
});

// Animate function
playArea.addEventListener("pointerup", function () {
  playerPosition = player.getBoundingClientRect();
  rounds++;
  round.textContent = rounds;
  ballSpeedInfo.textContent="0"
  const stopThreshold = 0.1;
  const velocity = {
    x: Math.cos(angle) * ballSpeed,
    y: Math.sin(angle) * ballSpeed,
  };

  clearInterval(ballSpeedInterval);

  // Create the ball object only once
  ball = new Ball(
    playerCanvas.width / 2,
    playerCanvas.height - 50,
    20,
    "#0014c3",
    velocity
  );

  function animate() {
    animateId = requestAnimationFrame(animate);
    playerContext.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    holeSArray.forEach((hole) => {
      hole.draw();
      const dist = Math.hypot(ball.x - hole.x, ball.y - hole.y);
      if (dist - ball.radius - hole.radius < 0.1) {
        hole.color = "green";

        setTimeout(() => {
          cancelAnimationFrame(animateId);
          steps +=
            hole.number % 2 === 0
              ? parseInt(hole.number / 2)
              : parseInt(hole.number / 2) + 1;
          player.style = `--steps:${-steps * 15}px`;
          info.textContent = steps;
        }, 20);
        setTimeout(() => {
          if (playerPosition.top - finishLinePosition.bottom < 50) {
            console.log("winner");
          }

          endRound();
        }, 200);
      }
    });
    ball.update();
    if (
      Math.abs(ball.velocity.x) < stopThreshold &&
      Math.abs(ball.velocity.y) < stopThreshold
    ) {
      cancelAnimationFrame(animateId);
      endRound();
    }
  }

  animate();
});

function endRound() {
  setTimeout(() => {
    playerContext.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    holeSArray = [];
    createHoles();
    let endRoundBall = new Ball(
      playerCanvas.width / 2,
      playerCanvas.height - 50,
      20,
      "#0014c3"
    );
    endRoundBall.draw();
  }, 700);
}