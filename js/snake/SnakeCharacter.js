export class SnakeBodyPart {
	constructor({ position = { x, y }, side }) {
		this.position = position;
		this.side = side;
		this.snakeCollisionSetup = {
			width: 24,
			height: 24,
			color: null,
		};
		this.sprite = {
			src: document.getElementById('snakeSprite'),
			width: 18,
			height: 18,
			frameX: null,
			frameY: null,
		};
		this.editSprite = {
			resize: 1.6,
		};
		this.bodyPart = {
			head: false,
			body: false,
			tail: false,
		};
	}
}

export class SnakeCharacter {
	constructor(snake) {
		this.snake = snake;
		this.side = 'down';
		this.bodyArray = [
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 8 },
				side: this.side,
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 7 },
				side: this.side,
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 6 },
				side: this.side,
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 5 },
				side: this.side,
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 4 },
				side: this.side,
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 3 },
				side: this.side,
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 2 },
				side: this.side,
			}),
			new SnakeBodyPart({
				position: { x: this.snake.boardSetup.x + 24 * 7, y: this.snake.boardSetup.y + 24 * 1 },
				side: this.side,
			}),
		];
		this.devMode = this.snake.game.gameSetup.devMode ? 0.5 : 0;
	}

	basicSpriteFrame(el, { side, frameX, frameY }) {
		if (el.side === side) {
			el.sprite.frameX = frameX;
			el.sprite.frameY = frameY;
		}
	}

	turningSpriteFrame(index, el, { from, to, from2, to2, frameX, frameY }) {
		if (
			(el.side === from && this.bodyArray[index - 1].side === to) ||
			(el.side === from2 && this.bodyArray[index - 1].side === to2)
		) {
			el.sprite.frameX = frameX;
			el.sprite.frameY = frameY;
		}
	}

	endOfTailSpriteFrame(index, el, { side, frameX, frameY }) {
		if (this.bodyArray[index - 1].side === side) {
			el.sprite.frameX = frameX;
			el.sprite.frameY = frameY;
		}
	}

	interpreter(index, el) {
		if (index === 0) {
			el.snakeCollisionSetup.color = `rgba(128, 0, 0, ${this.devMode})`;
			el.bodyPart = {
				head: true,
				tail: false,
				endOfTail: false,
			};
		}
		if (index > 0) {
			el.snakeCollisionSetup.color = `rgba(255, 0, 0, ${this.devMode})`;
			el.bodyPart = {
				head: false,
				tail: true,
				endOfTail: false,
			};
		}
		if (index === this.bodyArray.length - 1) {
			el.snakeCollisionSetup.color = `rgba(255, 99, 71, ${this.devMode})`;
			el.bodyPart = {
				head: false,
				tail: false,
				endOfTail: true,
			};
		}
		if (el.bodyPart.head) {
			this.basicSpriteFrame(el, { side: 'up', frameX: 0, frameY: 0 });
			this.basicSpriteFrame(el, { side: 'down', frameX: 2, frameY: 0 });
			this.basicSpriteFrame(el, { side: 'left', frameX: 3, frameY: 0 });
			this.basicSpriteFrame(el, { side: 'right', frameX: 1, frameY: 0 });
		}
		if (el.bodyPart.tail) {
			this.basicSpriteFrame(el, { side: 'up', frameX: 0, frameY: 3 });
			this.basicSpriteFrame(el, { side: 'down', frameX: 0, frameY: 3 });
			this.basicSpriteFrame(el, { side: 'left', frameX: 1, frameY: 3 });
			this.basicSpriteFrame(el, { side: 'right', frameX: 1, frameY: 3 });
			this.turningSpriteFrame(index, el, { from: 'down', to: 'right', from2: 'left', to2: 'up', frameX: 0, frameY: 2 });
			this.turningSpriteFrame(index, el, { from: 'down', to: 'left', from2: 'right', to2: 'up', frameX: 3, frameY: 2 });
			this.turningSpriteFrame(index, el, { from: 'up', to: 'left', from2: 'right', to2: 'down', frameX: 2, frameY: 2 });
			this.turningSpriteFrame(index, el, { from: 'up', to: 'right', from2: 'left', to2: 'down', frameX: 1, frameY: 2 });
		}
		if (el.bodyPart.endOfTail) {
			this.endOfTailSpriteFrame(index, el, { side: 'up', frameX: 0, frameY: 1 });
			this.endOfTailSpriteFrame(index, el, { side: 'down', frameX: 2, frameY: 1 });
			this.endOfTailSpriteFrame(index, el, { side: 'left', frameX: 3, frameY: 1 });
			this.endOfTailSpriteFrame(index, el, { side: 'right', frameX: 1, frameY: 1 });
		}
	}

	draw(ctx) {
		for (const [index, el] of this.bodyArray.entries()) {
			this.interpreter(index, el);
			ctx.fillStyle = el.snakeCollisionSetup.color;
			ctx.fillRect(el.position.x, el.position.y, el.snakeCollisionSetup.width, el.snakeCollisionSetup.height);
			ctx.drawImage(
				el.sprite.src,
				el.sprite.frameX * el.sprite.width,
				el.sprite.frameY * el.sprite.height,
				el.sprite.width,
				el.sprite.height,
				el.position.x + el.snakeCollisionSetup.width / 2 - (el.sprite.width * el.editSprite.resize) / 2,
				el.position.y + el.snakeCollisionSetup.height / 2 - (el.sprite.height * el.editSprite.resize) / 2,
				el.sprite.width * el.editSprite.resize,
				el.sprite.height * el.editSprite.resize
			);
		}
	}
}
