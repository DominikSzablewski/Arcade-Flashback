import { Image } from '../Image.js';
export class NpcHoverStyle {
	constructor(npc) {
		this.npc = npc;
		this.textBox = new Image({
			src: { id: 'textBox' },
			size: { width: 1600, height: 1200 },
			offsetSize: { x: 0, y: 100 },
			position: {
				x: this.npc.game.canvas.width / 2 - (1600 * 0.75) / 2,
				y: this.npc.game.canvas.height / 2 - (1200 * 0.75) / 2,
			},
			offsetPosition: { x: -39.5, y: 110 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.75 },
		});
		this.textBoxHover = new Image({
			src: { id: 'textBoxHover' },
			size: { width: 1600, height: 1200 },
			offsetSize: { x: 0, y: 100 },
			position: {
				x: this.npc.game.canvas.width / 2 - (1600 * 0.75) / 2,
				y: this.npc.game.canvas.height / 2 - (1200 * 0.75) / 2,
			},
			offsetPosition: { x: -39.5, y: 110 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.75 },
		});
	}
	draw(ctx) {
		this.npcHoverFlag = this.npc.game.npcHoverFlag;
		if (this.npcHoverFlag) {
			this.textBoxHover.draw(ctx);
		} else {
			this.textBox.draw(ctx);
		}
	}
}
