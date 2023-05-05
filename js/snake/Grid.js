export class Grid {
	constructor(snake) {
		this.snake = snake;
		this.gridSetup = {
			src: document.getElementById('grid'),
			imageOnCanvasX: 0,
			imageOnCanvasY: 0,
			imageWidth: 1900,
			imageHeight: 900,
			imageResize: 1,
		};
		this.devMode = this.snake.game.gameSetup.devMode ? true : false;
	}

	drawLine({ lineToX, lineToY, moveToX, moveToY }, ctx) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.moveTo(moveToX, moveToY);
		ctx.lineTo(lineToX, lineToY);
		ctx.stroke();
		ctx.fillStyle = 'rgba(255,255,255,0.6)';
		ctx.fillRect(
			this.snake.boardSetup.x,
			this.snake.boardSetup.y,
			this.snake.boardSetup.width,
			this.snake.boardSetup.height
		);
	}

	drawGridAndSaveAsAnImage(ctx) {
		for (let i = 1; i <= 17; i++) {
			this.drawLine(
				{
					lineToX: this.snake.boardSetup.x,
					lineToY: this.snake.boardSetup.y + 24 * i,
					moveToX: this.snake.boardSetup.x + this.snake.boardSetup.width,
					moveToY: this.snake.boardSetup.y + 24 * i,
				},
				ctx
			);
		}
		for (let i = 1; i <= 20; i++) {
			this.drawLine(
				{
					lineToX: this.snake.boardSetup.x + 24 * i,
					lineToY: this.snake.boardSetup.y + this.snake.boardSetup.height,
					moveToX: this.snake.boardSetup.x + 24 * i,
					moveToY: this.snake.boardSetup.y,
				},
				ctx
			);
		}
	}

	draw(ctx) {
		if (this.devMode) {
			ctx.drawImage(this.gridSetup.src, this.gridSetup.imageOnCanvasX, this.gridSetup.imageOnCanvasY);
		}
	}
}
