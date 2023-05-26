import { ForMenuMain } from '../main/menuStyles/ForMenuMain.js';
import { ForNewGameMain } from './menuStyles/ForNewGameMain.js';

export class Menu {
	constructor(game) {
		this.game = game;
	}
	draw(ctx) {
		this.menuScene = this.game.menuScene;
		switch (this.menuScene) {
			case 'menuMain':
				this.forMenu = new ForMenuMain(this, ctx);
				break;
			case 'newGameMain':
				this.forNewGame = new ForNewGameMain(this, ctx);
				break;
		}
	}
}
