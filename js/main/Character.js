import { InputHandler } from './InputHandler.js';
import { Move } from './Move.js';

class Character extends Move {
	constructor(
		game,
		{
			spriteSetup = {
				src,
				frameX,
				frameXTemp,
				firstSpriteFrame,
				frameY,
				endFrameX,
				spriteWidth,
				spriteHeight,
				editSprite: {
					resize,
				},
			},
			characterSetup = { characterSpeed, characterFps, delta, lastTime },
			collisionSetup = { offsetX, offsetY, predictCollisionPerPixel, width, height },
		}
	) {
		super();
		this.game = game;
		this.spriteSetup = spriteSetup;
		this.spriteImage = document.getElementById(this.spriteSetup.src);
		this.characterSetup = characterSetup;
		this.characterPosition = {
			x: this.game.canvas.width / 2 - (this.spriteSetup.spriteWidth * this.spriteSetup.editSprite.resize) / 2,
			y: this.game.canvas.height / 2 - (this.spriteSetup.spriteHeight * this.spriteSetup.editSprite.resize) / 2,
		};
		this.collisionSetup = collisionSetup;
		this.collisionPosition = {
			x: this.game.canvas.width / 2 - this.collisionSetup.width / 2 - this.collisionSetup.offsetX,
			y: this.game.canvas.height / 2 - this.collisionSetup.height / 2 + this.collisionSetup.offsetY,
		};
		this.inputHandler = new InputHandler(this);
		this.devMode = this.game.gameSetup.devMode ? 0.5 : 0;
	}

	draw(ctx) {
		ctx.drawImage(
			this.spriteImage,
			this.spriteSetup.frameX * this.spriteSetup.spriteWidth,
			this.spriteSetup.frameY * this.spriteSetup.spriteHeight,
			this.spriteSetup.spriteWidth,
			this.spriteSetup.spriteHeight,
			this.characterPosition.x,
			this.characterPosition.y,
			this.spriteSetup.spriteWidth * this.spriteSetup.editSprite.resize - 15,
			this.spriteSetup.spriteHeight * this.spriteSetup.editSprite.resize + 10
		);
		ctx.fillStyle = `rgba(152, 0, 197, ${this.devMode})`;
		ctx.fillRect(
			this.collisionPosition.x,
			this.collisionPosition.y,
			this.collisionSetup.width,
			this.collisionSetup.height
		);
	}
}

export class Player {
	constructor(game) {
		this.game = game;
		this.character = new Character(this.game, {
			spriteSetup: {
				src: 'player',
				firstSpriteFrameX: 6,
				frameX: 7,
				frameXTemp: 7,
				endFrameX: 9,
				frameY: 0,
				spriteWidth: 48,
				spriteHeight: 72.5,
				editSprite: {
					resize: 2.4,
				},
			},
			characterSetup: { characterSpeed: 13, characterFps: 16, delta: 0, lastTime: 0 },
			collisionSetup: { offsetX: 8, offsetY: 80, predictCollisionPerPixel: 13, width: 60, height: 50 },
		});
	}
}
