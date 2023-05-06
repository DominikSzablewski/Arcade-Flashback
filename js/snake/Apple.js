export class Apple {
	constructor(snake) {
		this.snake = snake;

		this.collision = {
			width: 24,
			height: 24,
		};

		this.position = {
			x: this.snake.boardSetup.x + 24,
			y: this.snake.boardSetup.y + 24,
		};

		this.sprite = {
			src: document.getElementById('appleSprite'),
			width: 64,
			height: 64,
		};

		this.edit = {
			resize: 0.75,
			offset: 4,
		};
		this.devMode = this.snake.game.gameSetup.devMode ? 0.5 : 0;
		this.randomize();
	}

	draw(ctx) {
		ctx.fillStyle = `rgba(60, 179, 113, ${this.devMode})`;
		ctx.fillRect(this.position.x, this.position.y, this.collision.width, this.collision.height);
		ctx.drawImage(
			this.sprite.src,
			this.position.x + this.collision.width / 2 - (this.sprite.width * this.edit.resize) / 2,
			this.position.y + this.collision.height / 2 - (this.sprite.height * this.edit.resize) / 2 + 5,
			this.sprite.width * this.edit.resize,
			this.sprite.height * this.edit.resize
		);
	}

	randomize() {
		this.randomX = Math.floor(Math.random() * 21);
		this.randomY = Math.floor(Math.random() * 18);
		this.position = {
			x: this.snake.boardSetup.x + 24 * this.randomX,
			y: this.snake.boardSetup.y + 24 * this.randomY,
		};
	}
}
