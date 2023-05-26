import { Image } from '../../main/Image.js';
export class MainArea {
	constructor(menuElement) {
		this.menuElement = menuElement;
		this.mainArea = new Image({
			src: { id: 'menu-areaMain' },
			size: { width: 1900, height: 1574 },
			offsetSize: { x: 0, y: 60 },
			position: {
				x: this.menuElement.menu.game.canvas.width / 2 - (1900 * 0.65) / 2,
				y: this.menuElement.menu.game.canvas.height / 2 - (1574 * 0.65) / 2,
			},
			offsetPosition: { x: 0, y: -35 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.65 },
		});
	}
	draw(ctx) {
		this.mainArea.draw(ctx);
	}
}
