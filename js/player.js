class Player {
  constructor(gameScreen, left, top, width, height) {
    this.element = document.createElement("div");

    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    this.directionX = 0;

    this.element.style.bottom = "0";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.backgroundColor = "tomato";

    this.gameScreen.appendChild(this.element);
  }

  move() {
    console.log(this.directionX);
    this.left += this.directionX;

    if (this.left < 0) {
      this.left = 0;
    }
    if (this.left > 740) {
      this.left = 740;
    }

    console.log("move");
    this.updatePosition();
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      console.log("Catch");
      return true;
    } else {
      return false;
    }
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    console.log("update");
    this.element.style.top = `${this.top}px`;
  }
}
