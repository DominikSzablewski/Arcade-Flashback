import { Text } from '../main/Text.js';

export class ScoreSnake {
	constructor(snake) {
		this.snake = snake;
		this.digit = new Text({
			words: ['SCORE:'],
			position: { x: this.snake.boardSetup.x, y: this.snake.boardSetup.y },
			offsetPosition: { x: 72, y: -19 },
			font: { size: '31px', color: 'rgba(255, 220, 40, 1.0)' },
			shadow: { color: 'rgba(0, 155, 119, 1.0)', blur: 3.5, OffsetX: 1.5, OffsetY: 1 },
			letterSpacing: 0.5,
			wordSpacing: 5,
			score: { turnOn: true },
		});
	}
	scoreReset() {
		if (
			this.snake.menuScene === 'retryEasySnake' ||
			this.snake.menuScene === 'prepareToStartEasySnake' ||
			this.snake.menuScene === 'retryHardSnake' ||
			this.snake.menuScene === 'prepareToStartHardSnake'
		) {
			this.digit.scorePoints = 0;
			this.digit.words[1] = '0';
		}
	}
}

export class HighScoreEasySnake {
	constructor(snake) {
		this.snake = snake;
		this.digit = new Text({
			words: ['HIGH', 'SCORE:'],
			position: { x: this.snake.boardSetup.x, y: this.snake.boardSetup.y },
			offsetPosition: { x: 267, y: -19 },
			font: { size: '31px', color: 'rgba(255, 220, 40, 1.0)' },
			shadow: { color: 'rgba(255, 0, 0, 1.0)', blur: 3.5, OffsetX: 1.5, OffsetY: 1 },
			letterSpacing: 0.5,
			wordSpacing: 5,
			highScore: { turnOn: true },
			scoreFor: 'SnakeEasy',
		});
	}
	scoreReset() {
		this.snake.menuScene === 'gameOverEasySnake' && (this.digit.scorePoints = 0);
		this.snake.menuScene === 'gameOverHardSnake' && (this.digit.scorePoints = 0);
	}
}

export class HighScoreHardSnake extends HighScoreEasySnake {
	constructor(snake) {
		super(snake);
		this.digit = new Text({
			words: ['HIGH', 'SCORE:'],
			position: { x: this.snake.boardSetup.x, y: this.snake.boardSetup.y },
			offsetPosition: { x: 267, y: -19 },
			font: { size: '31px', color: 'rgba(255, 220, 40, 1.0)' },
			shadow: { color: 'rgba(255, 0, 0, 1.0)', blur: 3.5, OffsetX: 1.5, OffsetY: 1 },
			letterSpacing: 0.5,
			wordSpacing: 5,
			highScore: { turnOn: true },
			scoreFor: 'SnakeHard',
		});
	}
}
