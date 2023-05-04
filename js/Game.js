import { Background, Foreground } from './main/Sprite.js';
import { Player } from './main/Character.js';
import { TilesForCollision } from './main/TileForCollision.js';
import { SnakeGame } from './snake/SnakeGame.js';

const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#canvas1'));
const ctx = canvas.getContext('2d');
canvas.width = 1900;
canvas.height = 900;

class Game {
	constructor() {
		this.canvas = {
			width: canvas.width,
			height: canvas.height,
		};
		this.gameSetup = {
			x: -615,
			y: -4750,
			gameFps: 60,
			delta: 0,
			lastTime: 0,
			devMode: false,
			scene: 'snake',
		};
		this.snakeGame = new SnakeGame(this);
		this.tilesForCollision = new TilesForCollision(this);
		this.background = new Background(this);
		this.foreground = new Foreground(this);
		this.player = new Player(this);
		this.boundaries = [...this.tilesForCollision.array];
		this.forCollision = [...this.boundaries];
		this.forUpdateAxis = [this.background.sprite, ...this.boundaries, this.foreground.sprite];
		this.forDraw = [this.background.sprite, ...this.boundaries, this.player.character, this.foreground.sprite];
	}

	render(ctx, timeStamp) {
		this.gameSetup.delta = timeStamp - this.gameSetup.lastTime;
		if (this.gameSetup.delta > 1000 / this.gameSetup.gameFps) {
			switch (this.gameSetup.scene) {
				case 'main':
					for (const el of this.forDraw) {
						el.draw(ctx);
					}
					this.player.character.characterMoves(timeStamp);
					break;
				case 'snake':
					this.snakeGame.draw(ctx, timeStamp);
					this.snakeGame.moves(timeStamp);
					break;
			}

			this.gameSetup.lastTime = timeStamp;
		}
		// console.log(navigator.userAgent);
	}
}
window.addEventListener('load', () => {
	const game = new Game();
	const animation = timeStamp => {
		game.render(ctx, timeStamp);
		requestAnimationFrame(animation);
	};
	animation(0);
});
