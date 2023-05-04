export class Board {
	constructor(snake) {
		this.snake = snake;
	}

	draw(ctx) {
		ctx.fillStyle = 'rgba(255,255,255, 1)';
		ctx.fillRect(
			this.snake.boardSetup.x,
			this.snake.boardSetup.y,
			this.snake.boardSetup.width,
			this.snake.boardSetup.height
		);
	}
}
