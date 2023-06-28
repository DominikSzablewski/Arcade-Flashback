import { ForMenuSnake } from './menuStyles/ForMenuSnake.js';
import { ForBoardSnake } from './menuStyles/ForBoardSnake.js';
import { ForDifficultySnake } from './menuStyles/ForDifficultySnake.js';
import { ForEasySnake } from './menuStyles/ForEasySnake.js';
import { ForHardSnake } from './menuStyles/ForHardSnake.js';
import { ForGameOverSnake } from './menuStyles/ForGameOverSnake.js';
import { ForOptionsSnake } from './menuStyles/ForOptionsSnake.js';
export class Menu {
	constructor(snake) {
		this.snake = snake;
	}
	scorePosition() {
		if (this.snake.menuScene === 'gameOverEasySnake' || this.snake.menuScene === 'gameOverHardSnake') {
			this.snake.score.digit.offsetPosition.x = 146;
			this.snake.score.digit.offsetPosition.y = 200;
			this.snake.highScoreEasy.digit.offsetPosition.x = 146;
			this.snake.highScoreEasy.digit.offsetPosition.y = 160;
			this.snake.highScoreHard.digit.offsetPosition.x = 146;
			this.snake.highScoreHard.digit.offsetPosition.y = 160;
		} else {
			this.snake.score.digit.offsetPosition.x = 72;
			this.snake.score.digit.offsetPosition.y = -19;
			this.snake.highScoreEasy.digit.offsetPosition.x = 267;
			this.snake.highScoreEasy.digit.offsetPosition.y = -19;
			this.snake.highScoreHard.digit.offsetPosition.x = 267;
			this.snake.highScoreHard.digit.offsetPosition.y = -19;
		}
	}

	draw(ctx) {
		this.scorePosition();
		this.menuScene = this.snake.game.menuScene;
		switch (this.menuScene) {
			case 'menuSnake':
				this.forMenu = new ForMenuSnake(this, ctx);
				break;
			case 'boardSnake':
				this.forBoard = new ForBoardSnake(this, ctx);
				break;
			case 'difficultySnake':
				this.forDifficulty = new ForDifficultySnake(this, ctx);
				break;
			case 'easySnake':
				this.forEasy = new ForEasySnake(this, ctx);
				break;
			case 'hardSnake':
				this.forHard = new ForHardSnake(this, ctx);
				break;
			case 'gameOverEasySnake':
				this.forGameOver = new ForGameOverSnake(this, ctx);
				break;
			case 'gameOverHardSnake':
				this.forGameOver = new ForGameOverSnake(this, ctx);
				break;
			case 'optionsSnake':
				this.forGameOver = new ForOptionsSnake(this, ctx);
				break;
		}
	}
}
