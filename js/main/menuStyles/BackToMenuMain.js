import { InputHandler } from '../InputHandler.js';
export class BackToMenuMain {
	constructor(game) {
		this.game = game;
		this.inputHandler = new InputHandler(this);
	}
	apply() {
		if (this.inputHandler.menuMain) {
			localStorage.setItem('scene', 'startingMenu');
			this.inputHandler.menuMain = false;
		}
	}
}
