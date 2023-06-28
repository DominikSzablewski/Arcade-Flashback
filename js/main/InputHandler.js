export class InputHandler {
	constructor(receiver, game) {
		this.game = game;
		this.receiver = receiver;
		this.receiver.lastKey = null;
		this.keyPressTemp = null;
		this.keyReleaseTemp = null;
		this.menuMain = false;
		window.addEventListener('keydown', e => {
			if (
				(e.key === 'w' ||
					e.key === 'W' ||
					e.key === 'a' ||
					e.key === 'A' ||
					e.key === 's' ||
					e.key === 'S' ||
					e.key === 'd' ||
					e.key === 'D') &&
				!localStorage.getItem('boardOfGlory')
			) {
				this.keyPressTemp = e.key;
				this.animationStart = true;
				this.receiver.lastKey = e.key;
			}
			if (e.key === 'Escape') {
				if (this.game) {
					if (this.game.gameScene === 'main' && !this.game.npc.npcScene) {
						this.menuMain = true;
					}
				}
			}
			if (e.key === 'b' || e.key === 'B') {
				if (this.game) {
					if (this.game.gameScene === 'main' && !this.game.npc.npcScene) {
						if (this.game.npc.completedQuest.npcDominik.snake) {
							if (!localStorage.getItem('boardOfGlory')) {
								localStorage.setItem('boardOfGlory', true);
							} else {
								localStorage.removeItem('boardOfGlory');
							}
						}
					}
				}
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
