import { Background, Foreground } from './main/Background.js';
import { ForNewGameMain } from './main/menuStyles/ForNewGameMain.js';
import { TilesForCollision } from './main/TileForCollision.js';
import { SnakeGame } from './snake/SnakeGame.js';
import { SceneSwitcher } from './main/sceneSwitcher.js';
import { MouseService } from './main/MouseService.js';
import { Menu } from './main/Menu.js';
import { BackToMenuMain } from './main/menuStyles/BackToMenuMain.js';
const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#canvas1'));
const ctx = canvas.getContext('2d');
canvas.width = 1900;
canvas.height = 900;

class Game {
	constructor() {
		this.canvas = {
			canvas: canvas,
			width: canvas.width,
			height: canvas.height,
		};
		this.gameSetup = {
			position: {
				x: Number(localStorage.getItem('position.x')) || -615,
				y: Number(localStorage.getItem('position.y')) || -4800,
			},
			gameFps: 60,
			delta: 0,
			lastTime: 0,
			devMode: false,
		};
		this.mouseService = new MouseService();
		this.mouseService.click();
		this.mouseService.hover();
		this.snakeGame = new SnakeGame(this);
		this.tilesForCollision = new TilesForCollision(this);
		this.background = new Background(this);
		this.foreground = new Foreground(this);
		this.sceneSwitcher = new SceneSwitcher(this);
		this.menu = new Menu(this);
		this.backToMenuMain = new BackToMenuMain(this);
		this.player = new ForNewGameMain(this.menu, ctx);
		this.boundaries = [...this.tilesForCollision.array];
		this.forCollision = [...this.boundaries];
		this.forUpdateAxis = [this.gameSetup, this.background.image, ...this.boundaries, this.foreground.image];
		this.forDraw = [this.background.image, ...this.boundaries, this.player.character, this.foreground.image];
	}

	render(ctx, timeStamp) {
		this.gameSetup.delta = timeStamp - this.gameSetup.lastTime;
		if (this.gameSetup.delta > 1000 / this.gameSetup.gameFps) {
			this.menuScene = this.mouseService.menu.scene;
			this.menuSceneEl = this.mouseService.menu.sceneElement;
			this.selected = this.mouseService.menu.selected;
			this.gameScene = localStorage.getItem('scene') || 'startingMenu';		
			this.sceneSwitcher.detect(ctx, timeStamp);
			this.mouseService.sceneWatcher();
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
