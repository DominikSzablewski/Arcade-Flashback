export class InputHandler {
	constructor(receiver) {
		this.receiver = receiver;
		this.receiver.lastKey = null;
		this.keyPressTemp = null;
		this.keyReleaseTemp = null;
		this.menuMain = false;
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
				this.animationStart = true;
				this.receiver.lastKey = e.key;
			}
			if (e.key === 'Escape') {
				this.menuMain = true;
			}
		});

		window.addEventListener('keyup', e => {
			this.keyReleaseTemp = e.key;
			this.keyPressTemp === this.keyReleaseTemp && (this.animationStart = false);
		});

		window.addEventListener('blur', () => {
			this.animationStart = false;
		});
	}
}
