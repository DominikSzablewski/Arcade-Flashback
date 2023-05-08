export class Text {
	constructor({
		words,
		position = { x, y },
		font = { size, color },
		shadow = { color, blur, OffsetX, OffsetY },
		letterSpacing,
		wordSpacing,
		score = { turnOn },
		highScore = { turnOn },
	}) {
		this.words = words;
		this.position = position;
		this.font = font;
		this.shadow = shadow;
		this.letterSpacing = letterSpacing;
		this.wordSpacing = wordSpacing;
		this.score = score;
		this.highScore = highScore;
		this.scorePoints = 0;
		this.highScorePoints = localStorage.getItem('highScore') || 0;
		this.countScore();
	}

	countScore() {
		if (this.score.turnOn) {
			if (this.scorePoints === 0) {
				this.pointsToString = this.scorePoints.toString();
				this.words.push(this.pointsToString);
			} else {
				this.pointsToString = this.scorePoints.toString();
				this.words.pop();
				this.words.push(this.pointsToString);
			}
		}
		if (this.highScore.turnOn) {
			this.pointsToString = this.highScorePoints.toString();
			this.words.push(this.pointsToString);
			if (this.words.length > 3) {
				this.words.pop();
			}
			if (this.scorePoints > this.highScorePoints) {
				this.highScorePoints = this.scorePoints;
				localStorage.setItem('highScore', `${this.scorePoints}`);
				this.pointsToString = this.highScorePoints.toString();
				this.words.pop();
				this.words.push(this.pointsToString);
			}
		}
	}

	colon(ctx, letter) {
		if (letter === ':') {
			ctx.fillText(letter, this.position.x + this.letterWidth, this.position.y - 3);
		} else {
			ctx.fillText(letter, this.position.x + this.letterWidth, this.position.y);
		}
	}

	text(ctx, letterIndex, letter, { statement, symbol, letterWidthValue }) {
		if (statement) {
			if (letterIndex === 0) {
				if (symbol === '=') {
					this.letterWidth = letterWidthValue;
				} else if (symbol === '+=') {
					this.letterWidth += letterWidthValue;
				}
			} else {
				this.letterWidth += ctx.measureText(this.letterArray[letterIndex - 1]).width + this.letterSpacing;
			}
			if (letterIndex === this.letterArray.length - 1) {
				this.lastLetter = ctx.measureText(letter).width + this.letterSpacing;
			}
			this.colon(ctx, letter);
		}
	}

	draw(ctx) {
		ctx.shadowColor = this.shadow.color;
		ctx.shadowBlur = this.shadow.blur;
		ctx.shadowOffsetX = this.shadow.OffsetX;
		ctx.shadowOffsetY = this.shadow.OffsetY;
		ctx.font = `${this.font.size} Concert One`;
		ctx.fillStyle = this.font.color;
		for (const [index, words] of this.words.entries()) {
			this.letterArray = words.split('');
			for (const [letterIndex, letter] of this.letterArray.entries()) {
				this.text(ctx, letterIndex, letter, {
					statement: index === 0,
					symbol: '=',
					letterWidthValue: 0,
				});
				this.text(ctx, letterIndex, letter, {
					statement: index > 0,
					symbol: '+=',
					letterWidthValue: this.lastLetter + this.wordSpacing,
				});
			}
		}
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
	}
}

export class SnakeScore {
	constructor(snake) {
		this.snake = snake;
		this.digit = new Text({
			words: ['SCORE:'],
			position: { x: this.snake.boardSetup.x + 72, y: this.snake.boardSetup.y - 18.5 },
			font: { size: '30px', color: 'RGBA(255, 220, 40, 1.0)' },
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
			position: { x: this.snake.boardSetup.x + 268, y: this.snake.boardSetup.y - 18.5 },
			font: { size: '30px', color: 'RGBA(255, 220, 40, 1.0)' },
			shadow: { color: 'red', blur: 3.5, OffsetX: 1.5, OffsetY: 1 },
			letterSpacing: 0.5,
			wordSpacing: 5,
			score: { turnOn: false },
			highScore: { turnOn: true },
		});
	}
}
