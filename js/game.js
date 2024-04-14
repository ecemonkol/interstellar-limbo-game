class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(this.gameScreen, 350, 450, 160, 30);
    this.height = 450;
    this.width = 900;
    this.obstacles = [];
    this.deathToll = 0;
    this.score = 0;
    this.gameIsOver = false;
    this.timeRemaining = 60;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
  }

  gameLoop() {
    console.log("in the game loop");
    console.log(this.timeRemaining, "game.jsicinde");

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
      } else if (obstacle.top > this.height) {
        this.deathToll++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

    this.height = 450 - this.deathToll * 8;
    this.gameScreen.style.height = `${this.height}px`;
    this.player.top = 450 - this.deathToll * 8;

    const scoreEl = document.getElementById("score");
    const deathTollEl = document.getElementById("death-toll");
    scoreEl.textContent = this.score;
    deathTollEl.textContent = this.deathToll;

    if (this.height < 20) {
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
    // Show end game screen
    this.gameEndScreen.style.display = "block";

    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `00:00`;
  }
}
