import { InputHandler } from '../main/InputHandler.js';
import { Move } from './Move.js';
import { Grid } from './Grid.js';
import { Background } from './Background.js';
import { Board } from './Board.js';
import { SnakeCharacter } from './SnakeCharacter.js';
import { Apple } from './apple.js';

export class SnakeGame {
	constructor(game) {
		this.game = game;

		this.boardSetup = {
			x: this.game.canvas.width / 2 - 252,
			y: this.game.canvas.height / 2 - 232,
			width: 504,
			height: 432,
		};

		this.drawFpsSetup = {
			drawFps: 20,
			delta: 0,
			lastTime: 0,
		};
		this.snakeFpsSetup = {
			snakeFps: 10,
			delta: 0,
			lastTime: 0,
		};

		this.snakeCharacter = new SnakeCharacter(this);
		this.inputHandler = new InputHandler(this);
		this.movement = new Move(this);
		this.background = new Background(this);
		this.board = new Board(this);
		this.grid = new Grid(this);
		this.apple = new Apple(this);
	}

	draw(ctx, timestamp) {
		this.drawFpsSetup.delta = timestamp - this.drawFpsSetup.lastTime;
		if (this.drawFpsSetup.delta > 1000 / this.drawFpsSetup.drawFps) {
			this.background.drawBackground(ctx);
			this.board.draw(ctx);
			this.grid.draw(ctx);
			this.apple.draw(ctx);
			this.snakeCharacter.draw(ctx);
			this.background.drawBackgroundImage(ctx);
			this.drawFpsSetup.lastTime = timestamp;
		}
	}

	moves(timestamp) {
		this.snakeFpsSetup.delta = timestamp - this.snakeFpsSetup.lastTime;
		if (this.snakeFpsSetup.delta > 1000 / this.snakeFpsSetup.snakeFps) {
			if (this.lastKey === 'w' || this.lastKey === 'W') {
				this.movement.apply({ x: 0, y: -24, side: 'up' });
			}
			if (this.lastKey === 's' || this.lastKey === 'S') {
				this.movement.apply({ x: 0, y: 24, side: 'down' });
			}
			if (this.lastKey === 'a' || this.lastKey === 'A') {
				this.movement.apply({ x: -24, y: 0, side: 'left' });
			}
			if (this.lastKey === 'd' || this.lastKey === 'D') {
				this.movement.apply({ x: 24, y: 0, side: 'right' });
			}
		
			this.snakeFpsSetup.lastTime = timestamp;
		}
	}
}
