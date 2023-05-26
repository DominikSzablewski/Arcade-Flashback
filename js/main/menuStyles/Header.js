import { Text } from '../../main/Text.js';
export class Header {
	constructor(menuElement, { words, x, y = -210, fontSize = 80, wordSpacing = 5 }) {
		this.menuElement = menuElement;
		this.words = words;
		this.y = y;
		this.fontSize = fontSize;
		this.wordSpacing = wordSpacing;
		this.text = new Text({
			words: this.words,
			position: {
				x: this.menuElement.menu.game.canvas.width / 2,
				y: this.menuElement.menu.game.canvas.height / 2,
			},
			offsetPosition: { x: x, y: this.y },
			font: { size: `${this.fontSize}px`, color: 'rgba(165, 0, 110, 1)' },
			shadow: { color: 'rgba(0, 0, 0, 1)', blur: 5, OffsetX: 0, OffsetY: 0 },
			letterSpacing: -1,
			wordSpacing: this.wordSpacing,
		});
	}
	draw(ctx) {
		this.text.draw(ctx);
	}
}
