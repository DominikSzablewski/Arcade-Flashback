export class InputHandler {
	constructor(receiver) {
		this.receiver = receiver;
		this.keyPressTemp = null;
		this.keyReleaseTemp = null;
		// this.animationStart = false;

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
		});

		window.addEventListener('keyup', e => {
			this.keyReleaseTemp = e.key;
			if (this.keyPressTemp === this.keyReleaseTemp) {
				this.animationStart = false;
			}
		});

		window.addEventListener('blur', () => {
			this.animationStart = false;
		});
	}
}
