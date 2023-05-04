export class Apple {
	constructor(snake) {
		this.snake = snake;
		this.appleSetup = {
			width: 24,
			height: 24,
			position: {
				x: this.snake.boardSetup.x + 24 * 2,
				y: this.snake.boardSetup.y + 24 * 2,
			},
			color: 'green',
		};
	}

	draw(ctx) {
		ctx.fillStyle = this.appleSetup.color;
		ctx.fillRect(this.appleSetup.position.x, this.appleSetup.position.y, this.appleSetup.width, this.appleSetup.height);
	}
}
