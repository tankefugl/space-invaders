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
  // Implement laser shooting logic
}

initializeGame();
