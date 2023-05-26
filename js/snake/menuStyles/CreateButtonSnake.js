import { Image } from '../../main/Image.js';
import { Text } from '../../main/Text.js';

export class CreateButtonSnake {
	constructor(menuElement, { offsetY, word, textOffset = { x, y } }) {
		this.menuElement = menuElement;
		this.offsetY = offsetY;
		this.word = word;
		this.textOffset = textOffset;
		this.image = new Image({
			src: { id: 'menu-areaSnake__button' },
			size: { width: 553, height: 169 },
			offsetSize: { x: 30, y: 5 },
			position: {
				x:
					this.menuElement.menu.snake.boardSetup.x +
					this.menuElement.menu.snake.boardSetup.width / 2 -
					(553 * 0.33) / 2,
				y: this.menuElement.menu.snake.boardSetup.y + this.menuElement.menu.snake.boardSetup.height / 2,
			},
			offsetPosition: { x: -13, y: this.offsetY },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.33 },
		});
		this.text = new Text({
			words: this.word,
			position: {
				x: this.menuElement.menu.snake.boardSetup.x + this.menuElement.menu.snake.boardSetup.width / 2,
				y: this.menuElement.menu.snake.boardSetup.y,
			},
			offsetPosition: { x: this.textOffset.x, y: this.textOffset.y },
			font: { size: '45px', color: 'rgba(39, 119, 55, 1.0)' },
			shadow: { color: 'rgba(0, 0, 0, 1.0)', blur: 3.5, OffsetX: 0, OffsetY: 0 },
			letterSpacing: 0,
			wordSpacing: 5,
		});
	}

	draw(ctx) {
		this.image.draw(ctx);
		this.text.draw(ctx);
	}
}
