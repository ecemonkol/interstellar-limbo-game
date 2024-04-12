class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = this.left = Math.floor(Math.random() * 900);
    this.top = 0;
    this.width = 45;
    this.height = 80;
    this.element = document.createElement("div");

    this.element.style.backgroundColor = "violet";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    this.top += 5;
    this.updatePosition();
  }
}
