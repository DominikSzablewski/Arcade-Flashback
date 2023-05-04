export class SnakeBodyPart {
	constructor({ width, height, position = { x, y }, color }) {
		this.width = width;
		this.height = height;
		this.position = position;
		this.color = color;
	}
}

export class SnakeCharacter {
	constructor(snake) {
		this.snake = snake;
		this.snakeSetup = {
			width: 24,
			height: 24,
		};
		this.bodyArray = [
			new SnakeBodyPart({
				width: this.snakeSetup.width,
				height: this.snakeSetup.height,
				position: { x: this.snake.boardSetup.x + 24 * 8, y: this.snake.boardSetup.y + 24 * 2 },
				color: 'red',
			}),
			new SnakeBodyPart({
				width: this.snakeSetup.width,
				height: this.snakeSetup.height,
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 2 },
				color: 'tomato',
			}),
			new SnakeBodyPart({
				width: this.snakeSetup.width,
				height: this.snakeSetup.height,
				position: { x: this.snake.boardSetup.x + 24 * 6, y: this.snake.boardSetup.y + 24 * 2 },
				color: 'tomato',
			}),
		];
	}

	draw(ctx) {
		for (const el of this.bodyArray) {
			ctx.fillStyle = el.color;
			ctx.fillRect(el.position.x, el.position.y, el.width, el.height);
		}
	}
}
