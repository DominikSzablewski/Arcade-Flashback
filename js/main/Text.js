export class Text {
	constructor({
		words,
		position = { x, y },
		offsetPosition = { x, y },
		font = { size, color },
		shadow = { color, blur, OffsetX, OffsetY },
		letterSpacing,
		wordSpacing,
		score = { turnOn: false },
		highScore = { turnOn: false },
		scoreFor,
	}) {
		this.words = words;
		this.position = position;
		this.offsetPosition = offsetPosition;
		this.font = font;
		this.shadow = shadow;
		this.letterSpacing = letterSpacing;
		this.wordSpacing = wordSpacing;
		this.score = score;
		this.highScore = highScore;
		this.scorePoints = 0;
		this.scoreFor = scoreFor;
		this.highScorePoints = localStorage.getItem(`highScore${this.scoreFor}`) || 0;
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
			if (this.scorePoints > 0) {
				localStorage.setItem(`score`, `${this.scorePoints}`);
			}
		}
		if (this.highScore.turnOn) {
			this.pointsToString = this.highScorePoints.toString();
			this.words.push(this.pointsToString);
			this.words.length > 3 && this.words.pop();
			if (this.scorePoints > this.highScorePoints) {
				this.highScorePoints = this.scorePoints;
				localStorage.setItem(`highScore${this.scoreFor}`, `${this.scorePoints}`);
				this.pointsToString = this.highScorePoints.toString();
				this.words.pop();
				this.words.push(this.pointsToString);
			}
		}
	}

	colon(ctx, letter) {
		if (letter === ':') {
			ctx.fillText(
				letter,
				this.position.x + this.letterWidth + this.offsetPosition.x,
				this.position.y - 3 + this.offsetPosition.y
			);
		} else {
			ctx.fillText(
				letter,
				this.position.x + this.letterWidth + this.offsetPosition.x,
				this.position.y + this.offsetPosition.y
			);
		}
	}

	text(ctx, letterIndex, letter, { statement, symbol, letterWidthValue }) {
		if (statement) {
			if (letterIndex === 0) {
				symbol === '=' && (this.letterWidth = letterWidthValue);
				symbol === '+=' && (this.letterWidth += letterWidthValue);
			} else {
				this.letterWidth += ctx.measureText(this.letterArray[letterIndex - 1]).width + this.letterSpacing;
			}
			letterIndex === this.letterArray.length - 1 &&
				(this.lastLetter = ctx.measureText(letter).width + this.letterSpacing);
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
