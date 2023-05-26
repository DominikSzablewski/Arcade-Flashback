import { Text } from '../../main/Text.js';
import { Image } from '../../main/Image.js';
export class HeaderSnake {
	constructor(menuElement, { words, x, y = 96, fontSize = 68, wordSpacing = 5 }) {
		this.menuElement = menuElement;
		this.words = words;
		this.y = y;
		this.fontSize = fontSize;
		this.wordSpacing = wordSpacing;
		this.header = new Image({
			src: { id: 'menu-areaSnake__header' },
			size: { width: 1068, height: 589 },
			offsetSize: { x: 25, y: -25 },
			position: {
				x:
					this.menuElement.menu.snake.boardSetup.x +
					this.menuElement.menu.snake.boardSetup.width / 2 -
					(1068 * 0.24) / 2,
				y: this.menuElement.menu.snake.boardSetup.y,
			},
			offsetPosition: { x: -12, y: 14 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.24 },
		});
		this.header.text = new Text({
			words: this.words,
			position: {
				x: this.menuElement.menu.snake.boardSetup.x + this.menuElement.menu.snake.boardSetup.width / 2,
				y: this.menuElement.menu.snake.boardSetup.y,
			},
			offsetPosition: { x: x, y: this.y },
			font: { size: `${this.fontSize}px`, color: 'rgba(27, 57, 36, 1.0)' },
			shadow: { color: 'rgba(0, 0, 0, 1)', blur: 3.5, OffsetX: 0, OffsetY: 0 },
			letterSpacing: -1,
			wordSpacing: this.wordSpacing,
		});
	}
	draw(ctx) {
		this.header.draw(ctx);
		this.header.text.draw(ctx);
	}
}
