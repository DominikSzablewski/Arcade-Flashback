export class Move {
	animate(timeStamp) {
		this.characterSetup.delta = timeStamp - this.characterSetup.lastTime;
		if (this.spriteSetup.animationStart) {
			if (this.characterSetup.delta > 1000 / this.characterSetup.characterFps) {
				this.spriteSetup.frameX++;
				if (this.spriteSetup.frameX >= this.spriteSetup.endFrameX) {
					this.spriteSetup.frameX = this.spriteSetup.firstSpriteFrameX;
				}
				this.characterSetup.lastTime = timeStamp;
			}
		} else if (!this.spriteSetup.animationStart) {
			if (this.characterSetup.delta > 1000 / this.characterSetup.characterFps) {
				this.spriteSetup.frameX = this.spriteSetup.frameXTemp;
				this.characterSetup.lastTime = timeStamp;
			}
		}
	}

	speed({ x, y }, timeStamp) {
		this.animate(timeStamp);
		for (const el of this.game.forUpdateAxis) {
			el.position.x += x;
			el.position.y += y;
		}
	}

	detectCollision({ rect1 = { x, y, width, height }, rect2 = { x, y, width, height } }) {
		return (
			rect1.x + rect1.width >= rect2.x &&
			rect1.x <= rect2.x + rect2.width &&
			rect1.y <= rect2.y + rect2.height &&
			rect1.y + rect1.height >= rect2.y
		);
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
					this.detectCollision({
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
					this.spriteSetup.animationStart = false;
					break;
				}
			}
			if (this.spriteSetup.animationStart) {
				for (const el of this.game.forUpdateAxis) {
					el.position.x += speed.x;
					el.position.y += speed.y;
				}
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
		if (!this.spriteSetup.animationStart) {
			this.speed({ x: 0, y: 0 }, timeStamp);
		}
	}
}
