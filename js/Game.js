import { audioSettings } from './main/audio.js';
import { Background, Foreground } from './main/Background.js';
import { ForNewGameMain } from './main/menuStyles/ForNewGameMain.js';
import { TilesForCollision } from './main/TileForCollision.js';
import { SnakeGame } from './snake/SnakeGame.js';
import { SceneSwitcher } from './main/sceneSwitcher.js';
import { MouseService } from './main/MouseService.js';
import { Menu } from './main/Menu.js';
import { BackToMenuMain } from './main/menuStyles/BackToMenuMain.js';
import { Npc } from './main/npc/Npc.js';
import { GloryBoard } from './main/menuStyles/GloryBoard.js';
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
		this.mouseService = new MouseService(this);
		this.mouseService.click();
		this.mouseService.hover();
		this.snakeGame = new SnakeGame(this);
		this.tilesForCollision = new TilesForCollision(this);
		this.background = new Background(this);
		this.foreground = new Foreground(this);
		this.sceneSwitcher = new SceneSwitcher(this);
		this.menu = new Menu(this);
		this.backToMenuMain = new BackToMenuMain(this);
		this.gloryBoard = new GloryBoard(this);
		this.player = new ForNewGameMain(this.menu, ctx);
		this.npc = new Npc(this, {
			firstSpriteFrameX: 0,
			frameX: 1,
			frameXTemp: 1,
			endFrameX: 3,
			frameY: 0,
			position: {
				x: (Number(localStorage.getItem('npcDominikPositionX')) || 23 * 128) + this.gameSetup.position.x,
				y: (Number(localStorage.getItem('npcDominikPositionY')) || 40.9 * 128) + this.gameSetup.position.y,
			},
		});
		this.boundaries = [...this.tilesForCollision.array];
		this.forCollision = [[...this.boundaries]];
		this.forUpdateAxis = [
			[this.gameSetup, this.background.image, ...this.boundaries, this.foreground.image],
			[this.npc.character],
		];
		this.forDraw = [
			this.background.image,
			...this.boundaries,
			this.npc.character,
			this.player.character,
			this.foreground.image,
		];
	}

	render(ctx, timeStamp) {
		this.gameSetup.delta = timeStamp - this.gameSetup.lastTime;
		if (this.gameSetup.delta > 1000 / this.gameSetup.gameFps) {
			this.menuScene = this.mouseService.menu.scene;
			this.menuSceneEl = this.mouseService.menu.sceneElement;
			this.selected = this.mouseService.menu.selected;
			this.npcHoverFlag = this.mouseService.npcHoverFlag;
			this.gameScene = localStorage.getItem('scene') || 'startingMenu';
			this.sceneSwitcher.detect(ctx, timeStamp);
			this.mouseService.sceneWatcher();
			this.player.updateCharacterSprites();
			this.npc.npcInit(ctx, timeStamp);
			this.gloryBoard.draw(ctx);
			this.gameSetup.lastTime = timeStamp;
		}
	}
}

const startGame = e => {
	let clicked = false;
	const gameScene = localStorage.getItem('scene') || 'startingMenu';
	window.addEventListener('load', () => {
		const popup = document.querySelector('.popup');
		popup.addEventListener('click', e => {
			if (!(popup === e.target) && !clicked) {
				const game = new Game();
				const animation = timeStamp => {
					game.render(ctx, timeStamp);
					requestAnimationFrame(animation);
				};
				if (!clicked) {
					switch (gameScene) {
						case 'startingMenu':
						case 'main':
							audioSettings.main.play();
							break;
						case 'snake':
							audioSettings.snake.play();
							break;
						default:
							break;
					}
				}
				animation(0);
				clicked = true;
				popup.classList.add('hidden');
			}
		});
	});
};
startGame();
