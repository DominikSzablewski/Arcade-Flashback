export class Board {
	constructor(snake) {
		this.snake = snake;
		this.setup = {
			src: document.getElementById('grass'),
			onSourceX: 0,
			onSourceY: 0,
			width: 200,
			height: 200,
			onCanvasX: this.snake.boardSetup.x,
			onCanvasY: this.snake.boardSetup.y,
		};
		this.offset = {
			x: 52,
			y: 17,
		};
	}

	grass(ctx, { onCanvasX, onCanvasY }) {
		ctx.drawImage(
			this.setup.src,
			this.setup.onSourceX,
			this.setup.onSourceY,
			this.setup.width,
			this.setup.height,
			this.setup.onCanvasX + onCanvasX,
			this.setup.onCanvasY + onCanvasY,
			this.setup.width + this.offset.x,
			this.setup.height + this.offset.y
		);
	}

	draw(ctx) {
		this.grass(ctx, { onCanvasX: 0, onCanvasY: 0 });
		this.grass(ctx, { onCanvasX: this.setup.width + this.offset.x, onCanvasY: 0 });
		this.grass(ctx, { onCanvasX: 0, onCanvasY: this.setup.height + this.offset.y });
		this.grass(ctx, { onCanvasX: this.setup.width + this.offset.x, onCanvasY: this.setup.height + this.offset.y });
	}
}
