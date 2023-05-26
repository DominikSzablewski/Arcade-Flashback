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
		spriteFrameSide = { side1, side2 },
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
				this.playerNumber = Number(localStorage.getItem('playerNumber'));
				if (this.playerNumber >= 4 && this.playerNumber <= 7) {
					this.spriteSetup.frameY = spriteFrameSide.side2;
				} else {
					this.spriteSetup.frameY = spriteFrameSide.side1;
				}
				this.speed({ x: speed.x, y: speed.y });
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
			spriteFrameSide: { side1: 3, side2: 7 },
			timeStamp,
		});
		this.move({
			key: { lowercase: 's', uppercase: 'S' },
			collision: {
				x: this.collisionPosition.x,
				y: this.collisionPosition.y + this.collisionSetup.predictCollisionPerPixel,
			},
			speed: { x: 0, y: -this.characterSetup.characterSpeed },
			spriteFrameSide: { side1: 0, side2: 4 },
			timeStamp,
		});
		this.move({
			key: { lowercase: 'a', uppercase: 'A' },
			collision: {
				x: this.collisionPosition.x - this.collisionSetup.predictCollisionPerPixel,
				y: this.collisionPosition.y,
			},
			speed: { x: this.characterSetup.characterSpeed, y: 0 },
			spriteFrameSide: { side1: 1, side2: 5 },
			timeStamp,
		});
		this.move({
			key: { lowercase: 'd', uppercase: 'D' },
			collision: {
				x: this.collisionPosition.x + this.collisionSetup.predictCollisionPerPixel,
				y: this.collisionPosition.y,
			},
			speed: { x: -this.characterSetup.characterSpeed, y: 0 },
			spriteFrameSide: { side1: 2, side2: 6 },
			timeStamp,
		});
		if (!this.inputHandler.animationStart) {
			this.speed({ x: 0, y: 0 });
		}
	}
}
