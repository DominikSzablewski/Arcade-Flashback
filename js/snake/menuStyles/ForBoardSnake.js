import { MainAreaSnake } from './MainAreaSnake.js';
import { HeaderSnake } from './HeaderSnake.js';
import { CreateButtonSnake } from './CreateButtonSnake.js';
import { Image } from '../../main/Image.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';

export class ForBoardSnake {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, this.menu.snake.game.menuSceneEl, {
			color: 'rgba(71, 200, 85, 0.8)',
		});
		this.draw(ctx);
	}

	styles() {
		this.mainArea = new MainAreaSnake(this);
		this.header = new HeaderSnake(this, { words: ['Board'], x: -80 });

		this.btn1 = new CreateButtonSnake(this, {
			offsetY: -75,
			word: ['Difficulty'],
			textOffset: { x: -90, y: 183 },
		});
		this.board1 = new Image({
			src: { id: 'menuAreaSnakeButton' },
			size: { width: 553, height: 169 },
			offsetSize: { x: -135, y: 15 },
			position: {
				x: this.menu.snake.boardSetup.x + this.menu.snake.boardSetup.width / 2 - (553 * 0.4) / 2,
				y: this.menu.snake.boardSetup.y + this.menu.snake.boardSetup.height / 2 - (169 * 0.4) / 2,
			},
			offsetPosition: { x: 15, y: 34 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.4 },
		});
		this.board2 = new Image({
			src: { id: 'menuAreaSnakeButton' },
			size: { width: 553, height: 169 },
			offsetSize: { x: -135, y: 15 },
			position: {
				x: this.menu.snake.boardSetup.x + this.menu.snake.boardSetup.width / 2 - (553 * 0.4) / 2,
				y: this.menu.snake.boardSetup.y + this.menu.snake.boardSetup.height / 2 - (169 * 0.4) / 2,
			},
			offsetPosition: { x: 121, y: 34 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.4 },
		});
		this.board1Grass = new Image({
			src: { id: 'board1Snake' },
			size: { width: 200, height: 200 },
			offsetSize: { x: 12, y: 5 },
			position: {
				x: this.menu.snake.boardSetup.x + this.menu.snake.boardSetup.width / 2 - (200 * 0.3) / 2,
				y: this.menu.snake.boardSetup.y + this.menu.snake.boardSetup.height / 2 - (200 * 0.3) / 2,
			},
			offsetPosition: { x: -58, y: 39 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.3 },
		});
		this.board2Grass = new Image({
			src: { id: 'board2Snake' },
			size: { width: 200, height: 200 },
			offsetSize: { x: 12, y: 5 },
			position: {
				x: this.menu.snake.boardSetup.x + this.menu.snake.boardSetup.width / 2 - (200 * 0.3) / 2,
				y: this.menu.snake.boardSetup.y + this.menu.snake.boardSetup.height / 2 - (200 * 0.3) / 2,
			},
			offsetPosition: { x: 47, y: 39 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.3 },
		});
		this.select = new Image({
			src: { id: 'selectSnake' },
			size: { width: 169, height: 203 },
			offsetSize: { x: -10, y: -20 },
			position: {
				x: this.menu.snake.boardSetup.x + this.menu.snake.boardSetup.width / 2 - (169 * 0.4) / 2,
				y: this.menu.snake.boardSetup.y + this.menu.snake.boardSetup.height / 2 - (203 * 0.4) / 2,
			},
			offsetPosition: { x: -48, y: 53 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.4 },
		});
		this.btn3 = new CreateButtonSnake(this, {
			offsetY: 96,
			word: ['Back'],
			textOffset: { x: -44, y: 357 },
		});
	}

	draw(ctx) {
		this.styles();
		this.mainArea.draw(ctx);
		this.header.draw(ctx);
		this.btn1.draw(ctx);
		this.board1.draw(ctx);
		this.board2.draw(ctx);
		this.board1Grass.draw(ctx);
		this.board2Grass.draw(ctx);
		this.btn3.draw(ctx);
		this.menuHoverStyle.draw(ctx, {
			btn1: { x: 10, flag: true },
			btn3: { x: 5, flag: true },
		});
		this.menu.snake.game.selected.board === 'board1Snake' && this.select.draw(ctx);
		this.menu.snake.game.selected.board === 'board2Snake' &&
			(this.select.offsetPosition.x = 58) &&
			this.select.draw(ctx);
	}
}
