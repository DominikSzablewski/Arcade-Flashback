import { InputHandler } from '../main/InputHandler.js';
import { Move } from './Move.js';
import { Grid } from './Grid.js';
import { Background } from './Background.js';
import { Board } from './Board.js';
import { SnakeCharacter } from './SnakeCharacter.js';
import { Apple } from './Apple.js';
import { SnakeScore, SnakeHighScore } from '../main/Text.js';
export class SnakeGame {
	constructor(game) {
		this.game = game;

		this.boardSetup = {
			x: this.game.canvas.width / 2 - 252,
			y: this.game.canvas.height / 2 - 183,
			width: 504,
			height: 432,
		};

		this.drawFpsSetup = {
			drawFps: 15,
			delta: 0,
			lastTime: 0,
		};
		this.snakeFpsSetup = {
			snakeFps: 10,
			delta: 0,
			lastTime: 0,
		};

		this.background = new Background(this);
		this.board = new Board(this);
		this.grid = new Grid(this);
		this.inputHandler = new InputHandler(this);
		this.move = new Move(this);
		this.snakeCharacter = new SnakeCharacter(this);
		this.apple = new Apple(this);
		this.score = new SnakeScore(this);
		this.highScore = new SnakeHighScore(this);
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
			this.score.digit.draw(ctx);
			this.highScore.digit.draw(ctx);
			this.drawFpsSetup.lastTime = timestamp;
		}
	}

	moves(timestamp) {
		this.snakeFpsSetup.delta = timestamp - this.snakeFpsSetup.lastTime;
		if (this.snakeFpsSetup.delta > 1000 / this.snakeFpsSetup.snakeFps) {
			this.move.movement();
			this.snakeFpsSetup.lastTime = timestamp;
		}
	}

	collision() {
		this.move.collision();
	}
}
