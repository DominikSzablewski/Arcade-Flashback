import { SnakeBodyPart } from './SnakeCharacter.js';
import { detectCollision } from '../main/detectCollision.js';

export class Move {
	constructor(snake) {
		this.snake = snake;
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

	movements() {
		if (this.snake.lastKey === 'w' || this.snake.lastKey === 'W') {
			this.apply({ x: 0, y: -24, side: 'up' });
		}
		if (this.snake.lastKey === 's' || this.snake.lastKey === 'S') {
			this.apply({ x: 0, y: 24, side: 'down' });
		}
		if (this.snake.lastKey === 'a' || this.snake.lastKey === 'A') {
			this.apply({ x: -24, y: 0, side: 'left' });
		}
		if (this.snake.lastKey === 'd' || this.snake.lastKey === 'D') {
			this.apply({ x: 24, y: 0, side: 'right' });
		}
	}

	posValues({ side, posX, posY }) {
		if (this.side === side) {
			this.posX = this.bodyArray[this.bodyArray.length - 1].position.x + posX;
			this.posY = this.bodyArray[this.bodyArray.length - 1].position.y + posY;
		}
	}

	collision() {
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
						visible: true,
					})
				);
				this.snake.score.digit.scorePoints += 1;
				this.snake.highScore.digit.scorePoints += 1;
				this.snake.score.digit.countScore();
				this.snake.highScore.digit.countScore();
			}
		}
	}
}
