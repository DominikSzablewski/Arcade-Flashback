import { SnakeBodyPart } from './SnakeCharacter.js';

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
}
