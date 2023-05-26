import { InputHandler } from '../main/InputHandler.js';
import { Move } from './Move.js';
import { Grid } from './Grid.js';
import { Background, BackgroundImage } from './Background.js';
import { Board } from './Board.js';
import { SnakeCharacter } from './SnakeCharacter.js';
import { Apple } from './Apple.js';
import { ScoreSnake, HighScoreEasySnake, HighScoreHardSnake } from './Score.js';
import { Menu } from './Menu.js';
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
			snakeFps: 7,
			delta: 0,
			lastTime: 0,
		};
		this.background = new Background(this);
		this.backgroundImage = new BackgroundImage(this);
		this.board = new Board(this);
		this.grid = new Grid(this);
		this.inputHandler = new InputHandler(this);
		this.move = new Move(this);
		this.snakeCharacter = new SnakeCharacter(this);
		this.apple = new Apple(this);
		this.score = new ScoreSnake(this);
		this.highScoreEasy = new HighScoreEasySnake(this);
		this.highScoreHard = new HighScoreHardSnake(this);
		this.menu = new Menu(this);
	}

	start(r1, r2, ctx) {
		this.menuScene === 'startEasySnake' || this.menuScene === 'startHardSnake'
			? this[r1][r2](ctx)
			: (this.lastKey = null);
	}

	scoreReset() {
		this.score.scoreReset();
		this.highScoreEasy.scoreReset();
		this.highScoreHard.scoreReset();
	}

	scoreDraw(ctx) {
		if (
			this.menuScene === 'startEasySnake' ||
			this.menuScene === 'gameOverEasySnake' ||
			this.menuScene === 'startHardSnake' ||
			this.menuScene === 'gameOverHardSnake'
		) {
			this.score.digit.draw(ctx);
		}
		if (this.menuScene === 'startEasySnake' || this.menuScene === 'gameOverEasySnake') {
			this.highScoreEasy.digit.draw(ctx);
		} else if (this.menuScene === 'startHardSnake' || this.menuScene === 'gameOverHardSnake') {
			this.highScoreHard.digit.draw(ctx);
		}
	}

	draw(ctx, timestamp) {
		this.selectedBoard = this.game.selected.board;
		this.drawFpsSetup.delta = timestamp - this.drawFpsSetup.lastTime;
		if (this.drawFpsSetup.delta > 1000 / this.drawFpsSetup.drawFps) {
			this.menuScene = this.game.menuScene;
			this.background.draw(ctx);
			this.board.draw(ctx, this.selectedBoard);
			this.grid.draw(ctx);
			this.start('apple', 'draw', ctx);
			this.start('snakeCharacter', 'draw', ctx);
			this.backgroundImage.draw(ctx);
			this.menu.draw(ctx, timestamp);
			this.scoreReset();
			this.scoreDraw(ctx);
			this.drawFpsSetup.lastTime = timestamp;
		}
	}

	moves(timestamp) {
		this.snakeFpsSetup.delta = timestamp - this.snakeFpsSetup.lastTime;
		if (this.snakeFpsSetup.delta > 1000 / this.snakeFpsSetup.snakeFps) {
			this.start('move', 'movements');
			this.snakeFpsSetup.lastTime = timestamp;
		}
	}

	collision() {
		this.move.collision();
	}
}
