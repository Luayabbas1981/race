// Game elements
const raceArea = document.querySelector(".race-area");
const finishLine = document.querySelector(".finish-line img");
const round = document.querySelector(".rounds span");
const info = document.querySelector(".steps span");
const ballSpeedInfo = document.querySelector(".ball-speed span");
const modals = document.querySelector(".modals");
const playArea = document.querySelector(".play-area");
const player = document.querySelector(".player");
const raceCanvas = document.getElementById("raceCanvas");
const playerCanvas = document.getElementById("playerCanvas");
const raceContext = raceCanvas.getContext("2d");
const playerContext = playerCanvas.getContext("2d");
// Game sound elements
const motor = document.querySelector(".motor");
motor.volume = 0.1;
// Game controls
const restart = document.querySelector("button");
const leftArrow = document.querySelector(".left-arrow");
const RightArrow = document.querySelector(".right-arrow");
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Game values
let mouseX;
let mouseY;
let playerPosition;
let ballSpeed = 0;
let ballPosition;
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
    raceContext.strokeStyle = "gray";
    raceContext.lineWidth = 1;
    raceContext.beginPath();
    raceContext.moveTo(
      isMobile ? 20 : 35,
      raceCanvas.height - (playerPosition.bottom - playerPosition.top + i * 14)
    );
    raceContext.lineTo(
      raceCanvas.width,
      raceCanvas.height - (playerPosition.bottom - playerPosition.top + i * 14)
    );
    raceContext.stroke();
    raceContext.closePath();
    raceContext.fillStyle = "blue"; // Set the color of the text
    raceContext.font = `${isMobile ? "10px Arial" : "14px Arial"}`; // Set the font size and family
    raceContext.fillText(
      i,
      isMobile ? 0 : 10,
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
    
    if (this.x + this.radius > playerCanvas.width || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x; 
    }

    
    if (
      this.y + this.radius > playerCanvas.height ||
      this.y - this.radius < 0
    ) {
      this.velocity.y = -this.velocity.y; 
    }
    const friction = 0.99; 
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
let initBall = new Ball(
  ballPosition ? ballPosition : playerCanvas.width / 2,
  playerCanvas.height - 30,
  isMobile ? 10 : 18,
  "#de0341"
);
initBall.draw();

// Hole class
function randomNumber(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
}
console.log((Math.random() + 0.1).toFixed(1));
class Hole {
  constructor(x, y, radius, color, number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.number = number;
    this.originalX = x ;
    this.speed = Number((Math.random() - 0.2).toFixed(1));
    this.firstRandomDirection = isMobile
      ? randomNumber(20, 25)
      : randomNumber(20, 50);
    this.secondRandomDirection = isMobile
      ? randomNumber(5, 20)
      : randomNumber(10, 50);
  }

  draw() {
    playerContext.clearRect(
      this.x - this.radius - 1,
      this.y - this.radius - 1,
      (this.radius + 2) * 2,
      (this.radius + 2) * 2
    );
    playerContext.beginPath();
    playerContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    playerContext.fillStyle = this.color;
    playerContext.fill();
    // Draw the number in the middle
    playerContext.fillStyle = "#ffffff";
    playerContext.font = `${isMobile ? "16px Arial" : "24px Arial"}`;
    playerContext.textAlign = "center";
    playerContext.textBaseline = "middle";
    playerContext.fillText(this.number, this.x, this.y);
  }
  update() {
    this.draw();

    if (
      this.x <= this.originalX - this.firstRandomDirection ||
      this.x >= this.originalX + this.secondRandomDirection
    ) {
      this.speed = -this.speed;
    }

    this.x += this.speed;
  }
}
let holesArray = [];
let holeAnimateId;
let numbersArray=[1,2,3,4,5,6]
function createHoles() {
  const x = playerCanvas.width;
  const radius = isMobile ? 17 : 28;
  const color = "#057ac3";
  numbersArray.sort(()=> Math.random() - 0.5)
  for (let index = 0; index < 6; index++) {
    if (index === 0) {
      let hole = new Hole(x / 8, isMobile ? 60 : 80, radius, color, numbersArray[0]);
      holesArray.push(hole);
    }
    if (index === 1) {
      let hole = new Hole(x / 2.2, isMobile ? 65 : 85, radius, color,numbersArray[1]);
      holesArray.push(hole);
    }
    if (index === 2) {
      let hole = new Hole(x / 1.3, isMobile ? 50 : 90, radius, color, numbersArray[2]);
      holesArray.push(hole);
    }
    if (index === 3) {
      let hole = new Hole(x / 5, isMobile ? 180 : 220, radius, color, numbersArray[3]);
      holesArray.push(hole);
    }
    if (index === 4) {
      let hole = new Hole(x / 2, isMobile ? 180 : 220, radius, color, numbersArray[4]);
      holesArray.push(hole);
    }
    if (index === 5) {
      let hole = new Hole(x / 1.35, isMobile ? 200 : 240, radius, color, numbersArray[5]);
      holesArray.push(hole);
    }
  
  }
  function holeAnimate() {
    holeAnimateId = requestAnimationFrame(holeAnimate);
    holesArray.forEach((hole) => hole.update());
  }
  holeAnimate();
  holesArray.forEach((item) => {
    console.log(item.number, item.speed);
  });
}
createHoles();

let ball;

// Set Speed function
function clickDown(event) {
  ballSpeed = 0;
  angle = Math.atan2(
    event.clientY - (initBall.y + playerCanvas.getBoundingClientRect().top),
    event.clientX - (initBall.x + playerCanvas.getBoundingClientRect().left)
  );
  ballSpeedInterval = setInterval(() => {
    ballSpeed++;
    ballSpeedInfo.textContent = ballSpeed;
    if (ballSpeed === 30) {
      clearInterval(ballSpeedInterval);
    }
  }, 50);
  playerCanvas.addEventListener("pointerup", clickUp, { once: true });
}
playerCanvas.addEventListener("pointerdown", clickDown, { once: true });

// Animate function
function clickUp() {
  playerCanvas.removeEventListener("pointerdown", clickDown);
  clearInterval(ballSpeedInterval);
  playerPosition = player.getBoundingClientRect();
  rounds++;
  round.textContent = rounds;
  ballSpeedInfo.textContent = "0";
  const stopThreshold = 0.1;
  const velocity = {
    x: Math.cos(angle) * ballSpeed,
    y: Math.sin(angle) * ballSpeed,
  };

  clearInterval(ballSpeedInterval);

  // Create the ball object only once
  ball = new Ball(
    playerCanvas.width / 2,
    playerCanvas.height - 30,
    isMobile ? 10 : 18,
    "#de0341",
    velocity
  );

  function animate() {
    animateId = requestAnimationFrame(animate);
    playerContext.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    holesArray.forEach((hole) => {
      hole.update();
      const dist = Math.hypot(ball.x - hole.x, ball.y - hole.y);
      if (dist - ball.radius - hole.radius < 0.1) {
        cancelAnimationFrame(holeAnimateId);
        hole.color = "#208f01";
        motor.play();
        setTimeout(() => {
          cancelAnimationFrame(animateId);
          steps +=
            hole.number  / 2/* % 2 === 0
              ? parseInt(hole.number / 2)
              : parseInt(hole.number / 2) + 1; */
          player.style = `--steps:${-steps * 15}px`;

          info.textContent = steps;
        }, 20);
        setTimeout(() => {
          if (playerPosition.top - finishLinePosition.bottom < 180) {
            player.style = `--steps:${-(
              raceCanvas.height - finishLinePosition.top
            )}px`;
            setTimeout(() => {
              cancelAnimationFrame(holeAnimateId);
              modals.classList.remove("d-none");
              modals.children[0].children[1].textContent = `${rounds} Rounds`;
            }, 1500);
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
}

function endRound() {
  cancelAnimationFrame(holeAnimateId);
  setTimeout(() => {
    playerContext.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    holesArray = [];
    createHoles();
    let endRoundBall = new Ball(
      playerCanvas.width / 2,
      playerCanvas.height - 30,
      isMobile ? 10 : 18,
      "#de0341"
    );
    endRoundBall.draw();
    playerCanvas.addEventListener("pointerdown", clickDown, { once: true });
  }, 700);
}

restart.onclick = () => {
  location.reload();
};
