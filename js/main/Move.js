import { detectCollision } from './detectCollision.js';

export class Move {
	animate(timeStamp) {
		this.characterSetup.delta = timeStamp - this.characterSetup.lastTime;
		if (this.inputHandler.animationStart) {
			if (this.characterSetup.delta > 1000 / this.characterSetup.characterFps) {
				this.spriteSetup.frameX++;
				if (this.spriteSetup.frameX >= this.spriteSetup.endFrameX) {
					this.spriteSetup.frameX = this.spriteSetup.firstSpriteFrameX;
				}
				this.characterSetup.lastTime = timeStamp;
			}
		} else if (!this.inputHandler.animationStart) {
			if (this.characterSetup.delta > 1000 / this.characterSetup.characterFps) {
				this.spriteSetup.frameX = this.spriteSetup.frameXTemp;
				this.characterSetup.lastTime = timeStamp;
			}
		}
	}

	speed({ x, y }) {
		for (const el of this.game.forUpdateAxis) {
			el.position.x += x;
			el.position.y += y;
		}
	}

	move({
		key = { lowercase, uppercase },
		collision = { x, y },
		speed = { x, y },
		spriteFrameSide = { side },
		timeStamp,
	}) {
		if (this.lastKey === key.lowercase || this.lastKey === key.uppercase) {
			this.animate(timeStamp);
			for (const el of this.game.forCollision) {
				if (
					detectCollision({
						rect1: {
							x: collision.x,
							y: collision.y,
							width: this.collisionSetup.width,
							height: this.collisionSetup.height,
						},
						rect2: {
							x: el.position.x,
							y: el.position.y,
							width: el.collisionSetup.width,
							height: el.collisionSetup.height,
						},
					})
				) {
					this.inputHandler.animationStart = false;
					break;
				}
			}
			if (this.inputHandler.animationStart) {
				this.speed({ x: speed.x, y: speed.y });
				this.spriteSetup.frameY = spriteFrameSide.side;
			}
		}
	}

	characterMoves(timeStamp) {
		this.move({
			key: { lowercase: 'w', uppercase: 'W' },
			collision: {
				x: this.collisionPosition.x,
				y: this.collisionPosition.y - this.collisionSetup.predictCollisionPerPixel,
			},
			speed: { x: 0, y: this.characterSetup.characterSpeed },
			spriteFrameSide: { side: 3 },
			timeStamp,
		});
		this.move({
			key: { lowercase: 's', uppercase: 'S' },
			collision: {
				x: this.collisionPosition.x,
				y: this.collisionPosition.y + this.collisionSetup.predictCollisionPerPixel,
			},
			speed: { x: 0, y: -this.characterSetup.characterSpeed },
			spriteFrameSide: { side: 0 },
			timeStamp,
		});
		this.move({
			key: { lowercase: 'a', uppercase: 'A' },
			collision: {
				x: this.collisionPosition.x - this.collisionSetup.predictCollisionPerPixel,
				y: this.collisionPosition.y,
			},
			speed: { x: this.characterSetup.characterSpeed, y: 0 },
			spriteFrameSide: { side: 1 },
			timeStamp,
		});
		this.move({
			key: { lowercase: 'd', uppercase: 'D' },
			collision: {
				x: this.collisionPosition.x + this.collisionSetup.predictCollisionPerPixel,
				y: this.collisionPosition.y,
			},
			speed: { x: -this.characterSetup.characterSpeed, y: 0 },
			spriteFrameSide: { side: 2 },
			timeStamp,
		});
		if (!this.inputHandler.animationStart) {
			this.speed({ x: 0, y: 0 });
		}
	}
}
