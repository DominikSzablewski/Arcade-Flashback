import { Image } from './Image.js';

export class Background {
	constructor(game) {
		this.game = game;
		this.image = new Image({
			src: { id: 'background_1' },
			size: { width: 7680, height: 7680 },
			position: { x: this.game.gameSetup.x, y: this.game.gameSetup.y },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 1 },
			offsetSize: { x: 0, y: 0 },
			offsetPosition: { x: 0, y: 0 },
		});
	}
}

export class Foreground {
	constructor(game) {
		this.game = game;
		this.image = new Image({
			src: { id: 'foreground' },
			size: { width: 7680, height: 7680 },
			position: { x: this.game.gameSetup.x, y: this.game.gameSetup.y },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 1 },
			offsetSize: { x: 0, y: 0 },
			offsetPosition: { x: 0, y: 0 },
		});
	}
}
