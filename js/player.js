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
    this.element.style.backgroundColor = "#3654ff";

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;

    if (this.left < 0) {
      this.left = 8;
    }
    if (this.left > 736) {
      this.left = 732;
    }
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
