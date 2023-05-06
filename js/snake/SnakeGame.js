import { InputHandler } from '../main/InputHandler.js';
import { Move } from './Move.js';
import { Grid } from './Grid.js';
import { Background } from './Background.js';
import { Board } from './Board.js';
import { SnakeCharacter, SnakeBodyPart } from './SnakeCharacter.js';
import { Apple } from './Apple.js';
import { detectCollision } from '../main/detectCollision.js';
import { Score } from './Score.js';

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
			drawFps: 20,
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
		this.movement = new Move(this);
		this.snakeCharacter = new SnakeCharacter(this);
		this.apple = new Apple(this);
		this.score = new Score({ text: 'SCORE', position: { x: this.boardSetup.x + 45, y: this.boardSetup.y - 19 } });
		this.hightScore = new Score({
			text: 'HIGH SCORE',
			position: { x: this.boardSetup.x + 270, y: this.boardSetup.y - 19 },
		});
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
			this.score.draw(ctx);
			this.hightScore.draw(ctx);

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
				this.collision();
			}
			if (this.lastKey === 'd' || this.lastKey === 'D') {
				this.movement.apply({ x: 24, y: 0, side: 'right' });
			}
			this.snakeFpsSetup.lastTime = timestamp;
		}
	}

	posValues({ side, posX, posY }) {
		if (this.side === side) {
			this.posX = this.bodyArray[this.bodyArray.length - 1].position.x + posX;
			this.posY = this.bodyArray[this.bodyArray.length - 1].position.y + posY;
		}
	}

	collision() {
		for (const el of this.snakeCharacter.bodyArray) {
			if (
				detectCollision({
					rect1: {
						x: el.position.x,
						y: el.position.y,
						width: el.collision.width - el.edit.offset,
						height: el.collision.height - el.edit.offset,
					},
					rect2: {
						x: this.apple.position.x,
						y: this.apple.position.y,
						width: this.apple.collision.width - this.apple.edit.offset,
						height: this.apple.collision.height - this.apple.edit.offset,
					},
				})
			) {
				this.apple.randomize();
				this.bodyArray = this.snakeCharacter.bodyArray;
				this.side = this.bodyArray[this.bodyArray.length - 1].side;
				this.posValues({ side: 'up', posX: 0, posY: 24 });
				this.posValues({ side: 'down', posX: 0, posY: -24 });
				this.posValues({ side: 'left', posX: 24, posY: 0 });
				this.posValues({ side: 'right', posX: -24, posY: 0 });
				this.snakeCharacter.bodyArray.push(
					new SnakeBodyPart({
						position: { x: this.posX, y: this.posY },
						side: this.side,
						visible: true,
					})
				);
				this.score.point += 1;
			}
		}
	}
}
