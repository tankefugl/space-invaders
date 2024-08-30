import './styles.css';

const gameContainer = document.getElementById('game');
let moveInterval;
let victoryAchieved = false;

function initializeGame() {
  // Initialize game elements
  const laserCannon = document.createElement('div');
  laserCannon.classList.add('laser-cannon');
  gameContainer.appendChild(laserCannon);

  // Add event listeners for game controls
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Create enemies
  createEnemies();
}

function handleKeyDown(event) {
  if (moveInterval && event.key !== ' ') return;

  switch (event.key) {
    case 'ArrowLeft':
      moveInterval = setInterval(() => moveLaserCannon(-10), 100);
      break;
    case 'ArrowRight':
      moveInterval = setInterval(() => moveLaserCannon(10), 100);
      break;
    case ' ':
      shootLaser();
      break;
  }
}

function handleKeyUp(event) {
  if (moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
  }
}

function moveLaserCannon(distance) {
  const laserCannon = document.querySelector('.laser-cannon');
  const currentLeft = parseInt(laserCannon.style.left || '50%', 10) + distance;
  const currentLeftPixels = (currentLeft / 100) * gameContainer.clientWidth;
  const newLeft = currentLeftPixels + distance;
  if (newLeft < 0) {
    laserCannon.style.left = '0%';
  } else if (newLeft > gameContainer.clientWidth - laserCannon.clientWidth) {
    laserCannon.style.left = '100%';
  } else {
    laserCannon.style.left = `${(newLeft / gameContainer.clientWidth) * 100}%`;
  }
}

function shootLaser() {
  const laser = document.createElement('div');
  laser.classList.add('laser');
  const laserCannon = document.querySelector('.laser-cannon');
  laser.style.left = laserCannon.style.left;
  laser.style.bottom = '60px';
  gameContainer.appendChild(laser);

  function moveLaserUp() {
    const currentBottom = parseInt(laser.style.bottom, 10);
    if (currentBottom >= gameContainer.clientHeight) {
      laser.remove();
    } else {
      laser.style.bottom = `${currentBottom + 10}px`;
      checkCollision(laser);
      requestAnimationFrame(moveLaserUp);
    }
  }

  requestAnimationFrame(moveLaserUp);
}

function createEnemies() {
  for (let i = 0; i < 5; i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = `${i * 50}px`;
    enemy.style.top = '0px';
    gameContainer.appendChild(enemy);
  }
}

let enemyDirection = 1;
let enemySpeed = 1;

function moveEnemies() {
  const enemies = document.querySelectorAll('.enemy');
  let dropDown = false;

  enemies.forEach((enemy) => {
    const currentLeft = parseInt(enemy.style.left, 10);
    enemy.style.left = `${currentLeft + enemyDirection * enemySpeed}px`;

    if (currentLeft + enemyDirection * enemySpeed >= gameContainer.clientWidth - 40 || currentLeft + enemyDirection * enemySpeed <= 0) {
      dropDown = true;
    }
  });

  if (dropDown) {
    enemies.forEach((enemy) => {
      const currentTop = parseInt(enemy.style.top, 10);
      enemy.style.top = `${currentTop + 40}px`;
    });
    enemyDirection *= -1;
    enemySpeed += 0.5;
  }
}

function checkCollision(laser) {
  const laserRect = laser.getBoundingClientRect();
  const enemies = document.querySelectorAll('.enemy');

  enemies.forEach((enemy) => {
    const enemyRect = enemy.getBoundingClientRect();

    if (
      laserRect.left < enemyRect.right &&
      laserRect.right > enemyRect.left &&
      laserRect.top < enemyRect.bottom &&
      laserRect.bottom > enemyRect.top
    ) {
      laser.remove();
      enemy.remove();
      checkVictory();
    }
  });
}

function checkVictory() {
  const enemies = document.querySelectorAll('.enemy');
  if (enemies.length === 0) {
    victoryAchieved = true;
    displayVictoryMessage();
  }
}

function displayVictoryMessage() {
  const victoryMessage = document.createElement('div');
  victoryMessage.classList.add('victory-message');
  victoryMessage.innerText = 'VICTORY!';
  gameContainer.appendChild(victoryMessage);
}

function gameLoop() {
  if (!victoryAchieved) {
    moveEnemies();
    requestAnimationFrame(gameLoop);
  }
}

initializeGame();
gameLoop();
