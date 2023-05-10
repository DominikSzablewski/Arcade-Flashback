import { Text } from '../main/Text.js';

export class SnakeScore {
	constructor(snake) {
		this.snake = snake;
		this.digit = new Text({
			words: ['SCORE:'],
			position: { x: this.snake.boardSetup.x + 72, y: this.snake.boardSetup.y - 19 },
			font: { size: '31px', color: 'RGBA(255, 220, 40, 1.0)' },
			shadow: { color: 'RGB(0, 155, 119)', blur: 3.5, OffsetX: 1.5, OffsetY: 1 },
			letterSpacing: 0.5,
			wordSpacing: 5,
			score: { turnOn: true },
			highScore: { turnOn: false },
		});
	}
}

export class SnakeHighScore {
	constructor(snake) {
		this.snake = snake;
		this.digit = new Text({
			words: ['HIGH', 'SCORE:'],
			position: { x: this.snake.boardSetup.x + 267, y: this.snake.boardSetup.y - 19 },
			font: { size: '31px', color: 'RGBA(255, 220, 40, 1.0)' },
			shadow: { color: 'red', blur: 3.5, OffsetX: 1.5, OffsetY: 1 },
			letterSpacing: 0.5,
			wordSpacing: 5,
			score: { turnOn: false },
			highScore: { turnOn: true },
		});
	}
}
