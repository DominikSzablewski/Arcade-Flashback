import { Image } from '../main/Image.js';

export class Board {
	constructor(snake) {
		this.snake = snake;
	}
	grass(ctx, board, { offsetPositionX, offsetPositionY }) {
		this.image = new Image({
			src: { id: board },
			size: { width: 200, height: 200 },
			offsetSize: { x: 52, y: 17 },
			position: { x: this.snake.boardSetup.x, y: this.snake.boardSetup.y },
			offsetPosition: { x: offsetPositionX, y: offsetPositionY },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 1 },
		});
		this.image.draw(ctx);
	}

	draw(ctx, board) {
		this.grass(ctx, board, { offsetPositionX: 0, offsetPositionY: 0 });
		this.grass(ctx, board, { offsetPositionX: 252, offsetPositionY: 0 });
		this.grass(ctx, board, { offsetPositionX: 0, offsetPositionY: 217 });
		this.grass(ctx, board, { offsetPositionX: 252, offsetPositionY: 217 });
	}
}
