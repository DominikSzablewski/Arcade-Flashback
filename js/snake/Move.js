import { SnakeBodyPart } from './SnakeCharacter.js';
import { detectCollision } from '../main/detectCollision.js';
import { audioSettings } from '../main/audio.js';
export class Move {
	constructor(snake) {
		this.snake = snake;
		this.sides = null;
		this.digitalBeepingFlag = false;
		this.digitalBeepingArray = [null];
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

	gameOverAudioPack() {
		audioSettings.snakeHissing.stop();
		audioSettings.snake.stop();
		audioSettings.hit.play();
		audioSettings.gameOverVoiceover.play();
		audioSettings.gameOver.play();
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
				this.snake.highScoreEasy.digit.highScoreVoiceover = false;
				this.gameOverAudioPack();
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

	digitalBeepingStatement() {
		if (!this.digitalBeepingFlag) {
			this.digitalBeepingArray.unshift(this.snake.lastKey);
			if (this.digitalBeepingArray.length > 2) {
				this.digitalBeepingArray.pop();
			}
			if (this.digitalBeepingArray[0] !== this.digitalBeepingArray[1]) {
				audioSettings.digitalBeeping.play();
			}
			this.digitalBeepingFlag = true;
		}
		window.addEventListener('keyup', e => {
			this.digitalBeepingFlag = false;
		});
	}

	preventOppositeSide({ key = { lower, upper }, prevent, x, y, side }) {
		if (
			(this.snake.lastKey === key.lower && this.sides !== prevent) ||
			(this.snake.lastKey === key.upper && this.sides !== prevent)
		) {
			this.apply({ x: x, y: y, side: side });
			this.sides = side;
			this.digitalBeepingStatement();
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
				audioSettings.eat.play();
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
				if (this.snake.menuScene === 'startEasySnake') {
					this.snake.highScoreEasy.digit.scorePoints += 1;
					this.snake.highScoreEasy.digit.countScore();
				}
				if (this.snake.menuScene === 'startHardSnake') {
					this.snake.highScoreHard.digit.scorePoints += 1;
					this.snake.highScoreHard.digit.countScore();
				}
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
					if (this.snake.menuScene === 'startHardSnake') {
						this.snake.highScoreEasy.digit.highScoreVoiceover = false;
						this.gameOverAudioPack();
						localStorage.setItem('gameOverHardSnake', 'true');
						this.resetSnakeGameOver();
					}
				}
			}
		}
	}
}
