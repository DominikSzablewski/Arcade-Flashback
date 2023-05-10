import { Image } from '../main/Image.js';

export class Board {
	constructor(snake) {
		this.snake = snake;
	}
	grass(ctx, { offsetPositionX, offsetPositionY }) {
		this.image = new Image({
			src: { id: 'grass' },
			size: { width: 200, height: 200 },
			position: { x: this.snake.boardSetup.x, y: this.snake.boardSetup.y },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 1 },
			offsetSize: { x: 52, y: 17 },
			offsetPosition: { x: offsetPositionX, y: offsetPositionY },
		});
		this.image.draw(ctx);
	}

	draw(ctx) {
		this.grass(ctx, { offsetPositionX: 0, offsetPositionY: 0 });
		this.grass(ctx, { offsetPositionX: 252, offsetPositionY: 0 });
		this.grass(ctx, { offsetPositionX: 0, offsetPositionY: 217 });
		this.grass(ctx, { offsetPositionX: 252, offsetPositionY: 217 });
	}
}
