import { SnakeBodyPart } from './SnakeCharacter.js';
import { detectCollision } from '../main/detectCollision.js';

export class Move {
	constructor(snake) {
		this.snake = snake;
		this.sides = null;
	}

	resetSnakeGameOver() {
		this.snake.snakeCharacter.bodyArray = [
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 8 },
				side: 'down',
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 7 },
				side: 'down',
			}),
		];
		localStorage.setItem('sides', 'true');
	}

	apply({ x, y, side }) {
		for (const [index, el] of this.snake.snakeCharacter.bodyArray.entries()) {
			if (
				el.position.x < this.snake.boardSetup.x ||
				el.position.x > this.snake.boardSetup.x + this.snake.boardSetup.width - el.collision.width ||
				el.position.y < this.snake.boardSetup.y ||
				el.position.y > this.snake.boardSetup.y + this.snake.boardSetup.height - el.collision.height
			) {
				el.position.x += 0;
				el.position.y += 0;

				this.snake.menuScene === 'startEasySnake' && localStorage.setItem('gameOverEasySnake', 'true');
				this.snake.menuScene === 'startHardSnake' && localStorage.setItem('gameOverHardSnake', 'true');
				this.resetSnakeGameOver();
			} else {
				if (index === 0) {
					this.posX = el.position.x + x;
					this.posY = el.position.y + y;
					this.snake.snakeCharacter.bodyArray.pop();
					this.snake.snakeCharacter.bodyArray.unshift(
						new SnakeBodyPart({
							position: { x: this.posX, y: this.posY },
							side: side,
						})
					);
				}
			}
		}
	}

	preventOppositeSide({ key = { lower, upper }, prevent, x, y, side }) {
		if (
			(this.snake.lastKey === key.lower && this.sides !== prevent) ||
			(this.snake.lastKey === key.upper && this.sides !== prevent)
		) {
			this.apply({ x: x, y: y, side: side });
			this.sides = side;
		} else if (
			(this.snake.lastKey === key.lower && this.sides == prevent) ||
			(this.snake.lastKey === key.upper && this.sides == prevent)
		) {
			this.apply({ x: -x, y: -y, side: prevent });
		}

		if (localStorage.getItem('sides') === 'true') {
			this.sides = null;
			localStorage.removeItem('sides');
		}
	}

	movements() {
		this.preventOppositeSide({ key: { lower: 'w', upper: 'W' }, prevent: 'down', x: 0, y: -24, side: 'up' });
		this.preventOppositeSide({ key: { lower: 's', upper: 'S' }, prevent: 'up', x: 0, y: 24, side: 'down' });
		this.preventOppositeSide({ key: { lower: 'a', upper: 'A' }, prevent: 'right', x: -24, y: 0, side: 'left' });
		this.preventOppositeSide({ key: { lower: 'd', upper: 'D' }, prevent: 'left', x: 24, y: 0, side: 'right' });
	}

	posValues({ side, posX, posY }) {
		this.side === side && (this.posX = this.bodyArray[this.bodyArray.length - 1].position.x + posX);
		this.side === side && (this.posY = this.bodyArray[this.bodyArray.length - 1].position.y + posY);
	}

	collision() {
		this.collisionTail();
		for (const el of this.snake.snakeCharacter.bodyArray) {
			if (
				detectCollision({
					rect1: {
						x: el.position.x,
						y: el.position.y,
						width: el.collision.width - el.edit.offset,
						height: el.collision.height - el.edit.offset,
					},
					rect2: {
						x: this.snake.apple.collision.x,
						y: this.snake.apple.collision.y,
						width: this.snake.apple.collision.width,
						height: this.snake.apple.collision.height,
					},
				})
			) {
				this.snake.apple.randomize();
				this.bodyArray = this.snake.snakeCharacter.bodyArray;
				this.side = this.bodyArray[this.bodyArray.length - 1].side;
				this.posValues({ side: 'up', posX: 0, posY: 24 });
				this.posValues({ side: 'down', posX: 0, posY: -24 });
				this.posValues({ side: 'left', posX: 24, posY: 0 });
				this.posValues({ side: 'right', posX: -24, posY: 0 });
				this.snake.snakeCharacter.bodyArray.push(
					new SnakeBodyPart({
						position: { x: this.posX, y: this.posY },
						side: this.side,
					})
				);
				this.snake.score.digit.scorePoints += 1;
				this.snake.score.digit.countScore();
				this.snake.highScoreEasy.digit.scorePoints += 1;
				this.snake.highScoreEasy.digit.countScore();
				this.snake.highScoreHard.digit.scorePoints += 1;
				this.snake.highScoreHard.digit.countScore();
			}
		}
	}
	collisionTail() {
		for (const [index, el] of this.snake.snakeCharacter.bodyArray.entries()) {
			if (index === 0) {
				this.snakeHead = el;
			}
			if (index > 0) {
				if (
					detectCollision({
						rect1: {
							x: this.snakeHead.position.x,
							y: this.snakeHead.position.y,
							width: this.snakeHead.collision.width - this.snakeHead.edit.offset,
							height: this.snakeHead.collision.height - this.snakeHead.edit.offset,
						},
						rect2: {
							x: el.position.x,
							y: el.position.y,
							width: el.collision.width - el.edit.offset,
							height: el.collision.height - el.edit.offset,
						},
					})
				) {
					this.snake.menuScene === 'startHardSnake' && localStorage.setItem('gameOverHardSnake', 'true');
					this.snake.menuScene === 'startHardSnake' && this.resetSnakeGameOver();
				}
			}
		}
	}
}
