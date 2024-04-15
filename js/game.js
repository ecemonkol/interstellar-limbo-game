class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.timeAndScore = document.getElementById("time-score");
    this.result = document.getElementById("result");
    this.resultText = document.getElementById("result-text");
    this.player = new Player(this.gameScreen, 350, 450, 160, 25);
    this.height = 450;
    this.width = 900;
    this.obstacles = [];
    this.missingItems = 0;
    this.score = 0;
    this.gameIsOver = false;
    this.timeRemaining = 30;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
  }

  gameLoop() {
    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.timeAndScore.style.display = "flex";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  update() {
    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.score++;
        i--;
        const soundCatch = new Audio(
          `sounds/mixkit-sci-fi-positive-notification-266.wav`
        );
        soundCatch.play();
      } else if (obstacle.top > this.height) {
        this.missingItems++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

    this.height = 450 - this.missingItems * 10;
    this.gameScreen.style.height = `${this.height}px`;
    this.player.top = 450 - this.missingItems * 10;

    const scoreEl = document.getElementById("score");
    scoreEl.textContent = this.score;

    const finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = this.score;

    if (this.height < 30) {
      this.endGame();
    }

    if (this.timeRemaining === 0) {
      this.endGame();
    }

    console.log(this.obstacles);
    if (Math.random() > 0.89 && this.obstacles.length < 3) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(function (obstacle) {
      obstacle.element.remove();
    });

    this.gameIsOver = true;
    // Hide game screen
    this.gameScreen.style.display = "none";

    this.timeAndScore.style.display = "none";

    this.gameEndScreen.style.display = "block";

    // Show end game screen
    if (this.height >= 30) {
      // Player won
      this.result.textContent = "You Won!";
      this.resultText.textContent =
        "Victorious! You've escaped the multiverse chaos";
    }

    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `00:00`;
  }
}
