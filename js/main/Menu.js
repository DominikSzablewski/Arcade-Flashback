import { ForMenuMain } from '../main/menuStyles/ForMenuMain.js';
import { ForPlayMain } from './menuStyles/ForPlayMain.js';
import { ForOptionsMain } from './menuStyles/ForOptionsMain.js';
import { ForCreditsMain } from './menuStyles/ForCreditsMain.js';

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
			case 'playMain':
				this.forPlay = new ForPlayMain(this, ctx);
				break;
			case 'optionsMain':
				this.forOptionsMain = new ForOptionsMain(this, ctx);
				break;
			case 'creditsMain':
				this.forOptionsMain = new ForCreditsMain(this, ctx);
				break;
		}
	}
}
