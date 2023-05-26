export class SceneSwitcher {
	constructor(game) {
		this.game = game;
	}

	snakeArcade() {
		if (
			this.game.background.image.position.x <= -3283 &&
			this.game.background.image.position.x >= -3400 &&
			this.game.background.image.position.y <= -3200 &&
			this.game.background.image.position.y >= -3240
		) {
			localStorage.setItem('scene', 'snake');
			for (const el of this.game.forUpdateAxis) {
				el.position.y -= 30;
			}
		}
	}

	detect(ctx, timeStamp) {
		this.snakeArcade();
		switch (this.game.gameScene) {
			case 'startingMenu':
				this.game.menu.draw(ctx);
				break;
			case 'main':
				localStorage.setItem('position.x', `${this.game.gameSetup.position.x}`);
				localStorage.setItem('position.y', `${this.game.gameSetup.position.y}`);
				for (const el of this.game.forDraw) {
					el.draw(ctx);
				}
				this.game.player.character.characterMoves(timeStamp);
				this.game.backToMenuMain.apply();
				break;
			case 'snake':
				this.game.snakeGame.draw(ctx, timeStamp);
				this.game.snakeGame.moves(timeStamp);
				this.game.snakeGame.collision();
				break;
		}
	}
}
