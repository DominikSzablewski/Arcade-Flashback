import { Image } from '../main/Image.js';
export class Apple {
	constructor(snake) {
		this.snake = snake;
		this.image = new Image({
			src: { id: 'appleSprite' },
			size: { width: 64, height: 64 },
			position: {
				x: this.snake.boardSetup.x + 24 * 1,
				y: this.snake.boardSetup.y + 24 * 10,
			},
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.77 },
			offsetSize: { x: 0, y: 0 },
			offsetPosition: { x: -12, y: -7 },
		});
		this.collision = {
			width: 18,
			height: 18,
			x: this.image.position.x + 3,
			y: this.image.position.y + 3,
		};
		this.devMode = this.snake.game.gameSetup.devMode ? 0.5 : 0;
	}

	draw(ctx) {
		ctx.fillStyle = `rgba(0, 0, 255, ${this.devMode})`;
		ctx.fillRect(this.collision.x - 2, this.collision.y - 2, this.collision.width + 4, this.collision.height + 4);
		this.image.draw(ctx);
	}

	randomize() {
		this.randomX = Math.floor(Math.random() * 21);
		this.randomY = Math.floor(Math.random() * 18);
		this.image.position.x = this.snake.boardSetup.x + 24 * this.randomX;
		this.image.position.y = this.snake.boardSetup.y + 24 * this.randomY;
		this.collision.x = this.image.position.x + 3;
		this.collision.y = this.image.position.y + 3;
	}
}
