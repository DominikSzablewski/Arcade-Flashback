export class Apple {
	constructor(snake) {
		this.snake = snake;
		this.appleCollisionSetup = {
			width: 24,
			height: 24,
			position: {
				x: this.snake.boardSetup.x + 24 * 2,
				y: this.snake.boardSetup.y + 24 * 2,
			},
		};
		this.sprite = {
			src: document.getElementById('appleSprite'),
			width: 64,
			height: 64,
		};
		this.editSprite = {
			resize: 0.75,
		};
		this.devMode = this.snake.game.gameSetup.devMode ? 0.5 : 0;
	}

	draw(ctx) {
		ctx.fillStyle = `rgba(60, 179, 113, ${this.devMode})`;
		ctx.fillRect(
			this.appleCollisionSetup.position.x,
			this.appleCollisionSetup.position.y,
			this.appleCollisionSetup.width,
			this.appleCollisionSetup.height
		);
		ctx.drawImage(
			this.sprite.src,
			this.appleCollisionSetup.position.x +
				this.appleCollisionSetup.width / 2 -
				(this.sprite.width * this.editSprite.resize) / 2,
			this.appleCollisionSetup.position.y +
				this.appleCollisionSetup.height / 2 -
				(this.sprite.height * this.editSprite.resize) / 2 +
				3,
			this.sprite.width * this.editSprite.resize,
			this.sprite.height * this.editSprite.resize
		);
	}
}
// el.position.x + el.snakeCollisionSetup.width / 2 - (el.sprite.width * el.editSprite.resize) / 2,
