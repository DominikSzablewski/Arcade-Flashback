export class Background {
	constructor(snake) {
		this.snake = snake;
		this.backgroundImageSetup = {
			src: document.getElementById('snakeBackgroundImage'),
			imageOnSourceX: 0,
			imageOnSourceY: 0,
			imageWidth: 925,
			imageHeight: 802,
			imageResize: 1,
		};

		this.backgroundSetUp = {
			imageOnCanvasX:
				this.snake.game.canvas.width / 2 - (this.backgroundImageSetup.imageWidth * this.backgroundImageSetup.imageResize) / 2,
			imageOnCanvasY: 0,
			imageWidthResize: this.backgroundImageSetup.imageWidth * this.backgroundImageSetup.imageResize,
			imageHeightResize: this.backgroundImageSetup.imageHeight * this.backgroundImageSetup.imageResize + 105,
		};
	}

	drawBackground(ctx) {
		ctx.fillStyle = 'rgba(50,100,130, 1)';
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
			this.backgroundSetUp.imageWidthResize,
			this.backgroundSetUp.imageHeightResize
		);
	}
}
