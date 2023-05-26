import { Image } from '../../main/Image.js';
import { Text } from '../../main/Text.js';

export class CreateButton {
	constructor(menuElement, { offset = { x, y }, word, textOffset = { x, y } }) {
		this.menuElement = menuElement;
		this.offset = offset;
		this.word = word;
		this.textOffset = textOffset;
		this.image = new Image({
			src: { id: 'menu-areaMain__button' },
			size: { width: 500, height: 414 },
			offsetSize: { x: 0, y: 0 },
			position: {
				x: this.menuElement.menu.game.canvas.width / 2 - (500 * 0.95) / 2,
				y: this.menuElement.menu.game.canvas.height / 2 - (414 * 0.95) / 2,
			},
			offsetPosition: { x: this.offset.x, y: this.offset.y },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.95 },
		});
		this.text = new Text({
			words: this.word,
			position: {
				x: this.menuElement.menu.game.canvas.width / 2,
				y: this.menuElement.menu.game.canvas.height / 2,
			},
			offsetPosition: { x: this.textOffset.x, y: this.textOffset.y },
			font: { size: '45px', color: 'rgba(208,26,193,255)' },
			shadow: { color: 'rgba(0, 0, 0, 1)', blur: 3, OffsetX: 0, OffsetY: 0 },
			letterSpacing: 0,
			wordSpacing: 5,
		});
	}

	draw(ctx) {
		this.image.draw(ctx);
		this.text.draw(ctx);
	}
}
