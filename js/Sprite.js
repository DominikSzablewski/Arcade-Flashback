class Sprite {
	constructor({ src, position = { x, y } }) {
		this.src = src;
		this.image = document.getElementById(this.src);
		this.position = position;
	}
	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y);
	}
}

export class Background {
	constructor(game) {
		this.game = game;
		this.sprite = new Sprite({ src: 'background_1', position: { x: this.game.gameSetup.x, y: this.game.gameSetup.y } });
	}
}
export class Foreground {
	constructor(game) {
		this.game = game;
		this.sprite = new Sprite({ src: 'foreground', position: { x: this.game.gameSetup.x, y: this.game.gameSetup.y } });
	}
}
