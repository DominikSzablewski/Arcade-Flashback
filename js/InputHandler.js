export class InputHandler {
	constructor(player) {
		this.player = player;
		this.keyPressTemp = null;
		this.keyReleaseTemp = null;
		window.addEventListener('keydown', e => {
			if (
				e.key === 'w' ||
				e.key === 'W' ||
				e.key === 'a' ||
				e.key === 'A' ||
				e.key === 's' ||
				e.key === 'S' ||
				e.key === 'd' ||
				e.key === 'D'
			) {
				this.keyPressTemp = e.key;
				this.player.spriteSetup.animationStart = true;
				this.player.lastKey = e.key;
			}
		});

		window.addEventListener('keyup', e => {
			this.keyReleaseTemp = e.key;
			if (this.keyPressTemp === this.keyReleaseTemp) {
				this.player.spriteSetup.animationStart = false;
			}
		});

		window.addEventListener('blur', () => {
			this.player.spriteSetup.animationStart = false;
		});
	}
}
