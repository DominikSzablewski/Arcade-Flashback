export class Background {
	constructor(snake) {
		this.snake = snake;
		this.backgroundImageSetup = {
			src: document.getElementById('snakeBackgroundImage'),
			imageOnSourceX: 0,
			imageOnSourceY: 0,
			imageWidth: 3000,
			imageHeight: 2000,
		};

		this.edit = {
			resize: 0.42,
		};

		this.backgroundSetUp = {
			imageOnCanvasX:
				this.snake.game.canvas.width / 2 - (this.backgroundImageSetup.imageWidth * this.edit.resize) / 2 + 105,
			imageOnCanvasY: 0,
			widthResize: this.backgroundImageSetup.imageWidth * this.edit.resize - 205,
			heightResize: this.backgroundImageSetup.imageHeight * this.edit.resize + 67,
		};
	}

	drawBackground(ctx) {
		ctx.fillStyle = 'RGB(152, 180, 212)';
		ctx.fillRect(0, 0, this.snake.game.canvas.width, this.snake.game.canvas.height);
	}

	drawBackgroundImage(ctx) {
		ctx.drawImage(
			this.backgroundImageSetup.src,
			this.backgroundImageSetup.imageOnSourceX,
			this.backgroundImageSetup.imageOnSourceY,
			this.backgroundImageSetup.imageWidth,
			this.backgroundImageSetup.imageHeight,
			this.backgroundSetUp.imageOnCanvasX,
			this.backgroundSetUp.imageOnCanvasY,
			this.backgroundSetUp.widthResize,
			this.backgroundSetUp.heightResize
		);
	}
}
