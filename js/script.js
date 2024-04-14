window.onload = function () {
  const startButton = document.getElementById("start-button");
  const reStartButton = document.getElementById("restart-button");
  let game;
  let timer;

  startButton.addEventListener("click", () => {
    startGame();
  });

  reStartButton.addEventListener("click", () => {
    restartGame();
  });

  function startGame() {
    game = new Game();
    game.start();
    console.log("start game");
    console.log("hello malatya");
    if (timer) clearInterval(timer);

    timer = startTimer();
    console.log(game.timeRemaining);
  }
  function restartGame() {
    console.log("start game");
    restartTimer();
    location.reload();
  }

  function startTimer() {
    return setInterval(() => {
      if (!game || game.gameIsOver) return;
      const minutes = Math.floor(game.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (game.timeRemaining % 60).toString().padStart(2, "0");

      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      game.timeRemaining--;
      if (game.timeRemaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
  timer = startTimer();

  const restartTimer = () => {
    clearInterval(timer);
    timer = startTimer();
  };

  document.addEventListener("keydown", function (event) {
    event.preventDefault();
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
        game.player.directionX = -10;
        break;
      case "ArrowRight":
        game.player.directionX = 10;
        break;
    }
  });
};
