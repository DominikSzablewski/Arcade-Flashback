import { MenuBackgroundMain } from '../Background.js';
import { MainArea } from './MainArea.js';
import { Header } from './Header.js';
import { CreateButton } from './CreateButton.js';
import { Image } from '../Image.js';
import { Character } from '../Character.js';
import { MenuHoverStyle } from './MenuHoverStyle.js';

export class ForPlayMain {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.playerNumber = Number(localStorage.getItem('playerNumber'));
		this.menuHoverStyle = new MenuHoverStyle(this, this.menu.game.menuSceneEl, { color: 'rgba(255, 73, 246, 1)' });
		this.draw(this.ctx);
	}

	characterDraw({ firstSpriteFrameX, frameX, frameXTemp, endFrameX, frameY }) {
		if (this.playerNumber >= 4 && this.playerNumber <= 7) {
			this.offset = {
				x: 9,
				y: -15,
			};
		} else {
			this.offset = {
				x: 9,
				y: -20,
			};
		}

		this.character = new Character(this.menu.game, {
			spriteSetup: {
				src: 'player',
				firstSpriteFrameX: firstSpriteFrameX,
				frameX: frameX,
				frameXTemp: frameXTemp,
				endFrameX: endFrameX,
				frameY: frameY,
				spriteWidth: 48,
				spriteHeight: 72.5,
				edit: {
					resize: 2.4,
				},
			},
			characterSetup: {
				x: this.menu.game.canvas.width / 2 - (48 * 2.4) / 2 + this.offset.x,
				y: this.menu.game.canvas.height / 2 - (72.5 * 2.4) / 2 + this.offset.y,
				characterSpeed: 13,
				characterFps: 16,
				delta: 0,
				lastTime: 0,
			},
			collisionSetup: {
				x: this.menu.game.canvas.width / 2 - 60 / 2 - 8 + this.offset.x,
				y: this.menu.game.canvas.height / 2 - 50 / 2 + 80 + this.offset.y,
				predictCollisionPerPixel: 13,
				width: 60,
				height: 50,
			},
		});
		localStorage.setItem('firstSpriteFrameX', firstSpriteFrameX);
		localStorage.setItem('frameX', frameX);
		localStorage.setItem('frameXTemp', frameXTemp);
		localStorage.setItem('endFrameX', endFrameX);
		localStorage.setItem('frameY', frameY);
	}

	updateCharacterSprites() {
		if (this.menu.game.gameScene === 'prepareToMain') {
			this.character.spriteSetup.firstSpriteFrameX = Number(localStorage.getItem('firstSpriteFrameX'));
			this.character.spriteSetup.frameX = Number(localStorage.getItem('frameX'));
			this.character.spriteSetup.frameXTemp = Number(localStorage.getItem('frameXTemp'));
			this.character.spriteSetup.endFrameX = Number(localStorage.getItem('endFrameX'));
			this.character.spriteSetup.frameY = Number(localStorage.getItem('frameY'));
		}
	}

	slider() {
		switch (this.playerNumber) {
			case 0:
				this.characterDraw({ firstSpriteFrameX: 0, frameX: 1, frameXTemp: 1, endFrameX: 3, frameY: 0 });
				break;
			case 1:
				this.characterDraw({ firstSpriteFrameX: 3, frameX: 4, frameXTemp: 4, endFrameX: 6, frameY: 0 });
				break;
			case 2:
				this.characterDraw({ firstSpriteFrameX: 6, frameX: 7, frameXTemp: 7, endFrameX: 9, frameY: 0 });
				break;
			case 3:
				this.characterDraw({ firstSpriteFrameX: 9, frameX: 10, frameXTemp: 10, endFrameX: 12, frameY: 0 });
				break;
			case 4:
				this.characterDraw({ firstSpriteFrameX: 0, frameX: 1, frameXTemp: 1, endFrameX: 3, frameY: 4 });
				break;
			case 5:
				this.characterDraw({ firstSpriteFrameX: 3, frameX: 4, frameXTemp: 4, endFrameX: 6, frameY: 4 });
				break;
			case 6:
				this.characterDraw({ firstSpriteFrameX: 6, frameX: 7, frameXTemp: 7, endFrameX: 9, frameY: 4 });
				break;
			case 7:
				this.characterDraw({ firstSpriteFrameX: 9, frameX: 10, frameXTemp: 10, endFrameX: 12, frameY: 4 });
				break;
		}
	}

	styles(ctx) {
		this.background = new MenuBackgroundMain();
		this.mainArea = new MainArea(this);
		this.header = new Header(this, { words: ['Character'], x: -165 });
		this.characterBoard = new Image({
			src: { id: 'menu-areaBoard' },
			size: { width: 1000, height: 828 },
			offsetSize: { x: 0, y: -40 },
			position: {
				x: this.menu.game.canvas.width / 2 - (1000 * 0.55) / 2,
				y: this.menu.game.canvas.height / 2 - (828 * 0.55) / 2,
			},
			offsetPosition: { x: 0, y: 12 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.55 },
		});
		this.boardArrowLeft = new Image({
			src: { id: 'menu-areaMain__arrowLeft' },
			size: { width: 500, height: 414 },
			offsetSize: { x: 0, y: 0 },
			position: {
				x: this.menu.game.canvas.width / 2 - (500 * 0.3) / 2,
				y: this.menu.game.canvas.height / 2 - (414 * 0.3) / 2,
			},
			offsetPosition: { x: -180, y: 0 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.3 },
		});
		this.menu.game.menuSceneEl === 'arrowLeft'
			? (this.boardArrowLeft.image.src = '/src/main/images/MenuAreaArrowLeftHover.png')
			: (this.boardArrowLeft.image.src = '/src/main/images/menu-area__arrowLeft.png');

		this.boardArrowRight = new Image({
			src: { id: 'menu-areaMain__arrowRight' },
			size: { width: 500, height: 414 },
			offsetSize: { x: 0, y: 0 },
			position: {
				x: this.menu.game.canvas.width / 2 - (500 * 0.3) / 2,
				y: this.menu.game.canvas.height / 2 - (414 * 0.3) / 2,
			},
			offsetPosition: { x: 180, y: 0 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.3 },
		});
		this.menu.game.menuSceneEl === 'arrowRight'
			? (this.boardArrowRight.image.src = '/src/main/images/MenuAreaArrowRightHover.png')
			: (this.boardArrowRight.image.src = 'src/main/images/menu-area__arrowRight.png');
		this.btn3 = new CreateButton(this, {
			offset: { x: 0, y: 198 },
			word: ['Start'],
			textOffset: { x: -50, y: 213 },
		});
	}

	draw(ctx) {
		this.styles();
		this.background.image.draw(ctx);
		this.mainArea.draw(ctx);
		this.header.draw(ctx);
		this.characterBoard.draw(ctx);
		this.slider();
		this.character.draw(ctx);
		this.boardArrowLeft.draw(ctx);
		this.boardArrowRight.draw(ctx);
		this.btn3.draw(ctx);
		this.menuHoverStyle.draw(ctx, {
			btn3: { x: 5, flag: true },
		});
	}
}
