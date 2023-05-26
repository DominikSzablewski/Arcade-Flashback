import { Image } from './Image.js';

export class Background {
	constructor(game) {
		this.game = game;
		this.image = new Image({
			src: { id: 'background_1' },
			size: { width: 7680, height: 7680 },
			offsetSize: { x: 0, y: 0 },
			position: { x: this.game.gameSetup.position.x, y: this.game.gameSetup.position.y },
			offsetPosition: { x: 0, y: 0 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 1 },
		});
	}
}

export class Foreground {
	constructor(game) {
		this.game = game;
		this.image = new Image({
			src: { id: 'foreground' },
			size: { width: 7680, height: 7680 },
			offsetSize: { x: 0, y: 0 },
			position: { x: this.game.gameSetup.position.x, y: this.game.gameSetup.position.y },
			offsetPosition: { x: 0, y: 0 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 1 },
		});
	}
}

export class MenuBackgroundMain {
	constructor() {
		this.image = new Image({
			src: { id: 'menuBackgroundMain' },
			size: { width: 1912, height: 1075 },
			offsetSize: { x: 0, y: 0 },
			position: { x: 0, y: 0 },
			offsetPosition: { x: 0, y: 0 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 1 },
		});
	}
}
