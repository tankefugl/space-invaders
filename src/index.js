import './styles.css';

const gameContainer = document.getElementById('game');

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
  switch (event.key) {
    case 'ArrowLeft':
      moveLaserCannon(-10);
      break;
    case 'ArrowRight':
      moveLaserCannon(10);
      break;
    case ' ':
      shootLaser();
      break;
  }
}

function handleKeyUp(event) {
  // Handle key up events if needed
}

function moveLaserCannon(distance) {
  const laserCannon = document.querySelector('.laser-cannon');
  const currentLeft = parseInt(laserCannon.style.left || '50%', 10);
  laserCannon.style.left = `${currentLeft + distance}px`;
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

function gameLoop() {
  moveEnemies();
  requestAnimationFrame(gameLoop);
}

initializeGame();
gameLoop();
