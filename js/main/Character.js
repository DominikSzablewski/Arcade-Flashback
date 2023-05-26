import { InputHandler } from './InputHandler.js';
import { Move } from './Move.js';

export class Character extends Move {
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
				edit: {
					resize,
				},
			},
			characterSetup = { x, y, characterSpeed, characterFps, delta, lastTime },
			collisionSetup = { x, y, predictCollisionPerPixel, width, height },
		}
	) {
		super();
		this.game = game;
		this.spriteSetup = spriteSetup;
		this.spriteImage = document.getElementById(this.spriteSetup.src);
		this.characterSetup = characterSetup;
		this.characterPosition = {
			x: this.characterSetup.x,
			y: this.characterSetup.y,
		};
		this.collisionSetup = collisionSetup;
		this.collisionPosition = {
			x: this.collisionSetup.x,
			y: this.collisionSetup.y,
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
			this.spriteSetup.spriteWidth * this.spriteSetup.edit.resize - 15,
			this.spriteSetup.spriteHeight * this.spriteSetup.edit.resize + 10
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
