import { Image } from '../Image.js';

export class GloryBoard {
	constructor(game) {
		this.game = game;
		this.board = new Image({
			src: { id: 'gloryBoard' },
			size: { width: 2800, height: 1600 },
			offsetSize: { x: 0, y: 0 },
			position: {
				x: this.game.canvas.width / 2 - (2800 * 0.5) / 2,
				y: this.game.canvas.height / 2 - (1600 * 0.5) / 2,
			},
			offsetPosition: { x: 0, y: 0 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.5 },
		});
	}
	draw(ctx) {
		if (localStorage.getItem('boardOfGlory')) {
			this.board.draw(ctx);
		}
	}
}
