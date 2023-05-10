export class SceneSwitcher {
	constructor(game) {
		this.game = game;
	}

	snakeArcade() {
		if (
			this.game.background.image.position.x <= -3283 &&
			this.game.background.image.position.x >= -3400 &&
			this.game.background.image.position.y === -3216
		) {
			this.game.gameSetup.scene = 'snake';
		}
	}

	detect(ctx, timeStamp) {
		this.snakeArcade();
		switch (this.game.gameSetup.scene) {
			case 'main':
				localStorage.setItem('scene', 'main');
				for (const el of this.game.forDraw) {
					el.draw(ctx);
				}
				this.game.player.character.characterMoves(timeStamp);
				break;
			case 'snake':
				// localStorage.setItem('scene', 'snake');
				this.game.snakeGame.draw(ctx, timeStamp);
				this.game.snakeGame.collision();
				this.game.snakeGame.moves(timeStamp);
				break;
		}
	}
}
