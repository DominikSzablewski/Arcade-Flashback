import { InputHandler } from '../InputHandler.js';
import { audioSettings } from '../audio.js';
export class BackToMenuMain {
	constructor(game) {
		this.game = game;
		this.inputHandler = new InputHandler(this, this.game);
	}
	apply() {
		if (this.inputHandler.menuMain) {
			localStorage.setItem('scene', 'startingMenu');
			audioSettings.select.play();
			this.inputHandler.menuMain = false;
		}
	}
}
