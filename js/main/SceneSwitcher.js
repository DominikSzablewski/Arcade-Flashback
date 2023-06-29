import { audioSettings } from './audio.js';
export class SceneSwitcher {
	constructor(game) {
		this.game = game;
		this.activeNpcFlag = false;
		this.snakeArcadeFlag = false;
	}
	playerPush() {
		for (const [index, element] of this.game.forUpdateAxis.entries()) {
			for (const el of element) {
				if (index === 0) {
					el.position.y -= 40;
				}
			}
		}

		this.game.npc.character.characterPosition.y = 33.5 * 128 + this.game.gameSetup.position.y;
		this.game.npc.character.collisionPosition.y = 33.5 * 128 + this.game.gameSetup.position.y + 140;
	}

	snakeArcade() {
		if (
			this.game.background.image.position.x <= -3283 &&
			this.game.background.image.position.x >= -3400 &&
			this.game.background.image.position.y <= -3200 &&
			this.game.background.image.position.y >= -3240
		) {
			localStorage.setItem('scene', 'snake');
			audioSettings.main.stop();
			audioSettings.walking.stop();
			audioSettings.snake.play();
			audioSettings.select.volume(1);

			this.snakeArcadeFlag = true;
			this.playerPush();
		}
	}

	npcInitPack(npcName) {
		this.activeNpcFlag = true;
		this.game.npc.npcScene = npcName;
		this.game.npc.dialogueFlag = true;
	}

	beatScoresSnakeQuest() {
		const highScoreSnakeEasy = Number(localStorage.getItem('highScoreSnakeEasy'));
		const highScoreSnakeHard = Number(localStorage.getItem('highScoreSnakeHard'));
		if (highScoreSnakeEasy > 15 && highScoreSnakeHard > 15 && !this.game.npc.completedQuest.npcDominik.snake) {
			localStorage.setItem('npcConversation', 4);
			this.game.npc.npcConversation = 4;
		}
	}

	npcDominik() {
		if (this.game.gameSetup.position.x === -823 && this.game.npc.npcConversation === 1 && !this.activeNpcFlag) {
			this.npcInitPack('npcDominik');
		}
		if (
			this.game.background.image.position.x <= -4775 &&
			this.game.background.image.position.x >= -4970 &&
			this.game.background.image.position.y <= -3996 &&
			this.game.background.image.position.y >= -4020 &&
			!this.activeNpcFlag &&
			(this.game.npc.npcConversation === 2 ||
				this.game.npc.npcConversation === 3 ||
				this.game.npc.npcConversation === 4 ||
				this.game.npc.npcConversation === 5 ||
				this.game.npc.npcConversation === 6)
		) {
			this.playerPush();
			this.npcInitPack('npcDominik');
		}
		this.beatScoresSnakeQuest();
	}

	detect(ctx, timeStamp) {
		this.snakeArcade();
		this.npcDominik();
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
