import { Background, Foreground } from './main/Background.js';
import { Player } from './main/Character.js';
import { TilesForCollision } from './main/TileForCollision.js';
import { SnakeGame } from './snake/SnakeGame.js';
import { SceneSwitcher } from './main/sceneSwitcher.js';

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
			devMode: true,
			scene: localStorage.getItem('scene') || 'main',
		};
		this.snakeGame = new SnakeGame(this);
		this.tilesForCollision = new TilesForCollision(this);
		this.background = new Background(this);
		this.foreground = new Foreground(this);
		this.player = new Player(this);
		this.sceneSwitcher = new SceneSwitcher(this);
		this.boundaries = [...this.tilesForCollision.array];
		this.forCollision = [...this.boundaries];
		this.forUpdateAxis = [this.background.image, ...this.boundaries, this.foreground.image];
		this.forDraw = [this.background.image, ...this.boundaries, this.player.character, this.foreground.image];
	}

	render(ctx, timeStamp) {
		this.gameSetup.delta = timeStamp - this.gameSetup.lastTime;
		if (this.gameSetup.delta > 1000 / this.gameSetup.gameFps) {
			this.sceneSwitcher.detect(ctx, timeStamp);
			this.gameSetup.lastTime = timeStamp;
		}
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
