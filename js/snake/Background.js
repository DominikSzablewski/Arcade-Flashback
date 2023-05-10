import { Image } from '../main/Image.js';

export class Background {
	constructor(snake) {
		this.snake = snake;
	}
	draw(ctx) {
		ctx.fillStyle = 'RGB(152, 180, 212)';
		ctx.fillRect(0, 0, this.snake.game.canvas.width, this.snake.game.canvas.height);
	}
}
export class BackgroundImage {
	constructor(snake) {
		this.snake = snake;
		this.image = new Image({
			src: { id: 'snakeBackgroundImage' },
			size: { width: 3000, height: 2000 },
			position: { x: this.snake.game.canvas.width / 2 - (3000 * 0.43) / 2, y: 0 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.43 },
			offsetSize: { x: -234, y: 44 },
			offsetPosition: { x: 120, y: 0 },
		});
	}
	draw(ctx) {
		this.image.draw(ctx);
	}
}
