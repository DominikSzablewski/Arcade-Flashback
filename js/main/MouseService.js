import { audioSettings } from './audio.js';
const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#canvas1'));
canvas.width = 1900;
canvas.height = 900;

export class MouseService {
	constructor(game) {
		this.game = game;
		this.scene = null;
		this.npcScene = null;
		this.menu = {
			sceneElement: false,
			scene: 'menuMain',
			selected: { board: 'board1Snake' },
		};
		this.menuFlagSnake = false;
		this.startFlagMain = false;
		this.clickFlag = false;
		this.npcHoverFlag = false;
		this.playerNumber = Number(localStorage.getItem('playerNumber')) || 0;
	}

	cursorPointer() {
		return (canvas.style.cursor = 'pointer');
	}

	cursorDefault() {
		return (canvas.style.cursor = 'default');
	}

	areas(x, y, obj) {
		return (obj = {
			mainStart: {
				btn1: y > 347 && y < 438 && x > 810 && x < 1087,
				btn2: y > 474 && y < 565 && x > 810 && x < 1087,
				btn3: y > 603 && y < 694 && x > 810 && x < 1087,
				arrowLeft: y > 413 && y < 486 && x > 722 && x < 813,
				arrowRight: y > 413 && y < 486 && x > 1082 && x < 1173,
			},
			snake: {
				btn1: y > 405 && y < 468 && x > 844 && x < 1056,
				btn2: y > 490 && y < 553 && x > 844 && x < 1056,
				btn3: y > 577 && y < 640 && x > 844 && x < 1056,
				board1Snake: y > 483 && y < 565 && x > 852 && x < 938,
				board2Snake: y > 483 && y < 565 && x > 958 && x < 1044,
			},
			npc: y > 801 && y < 852 && x > 1369 && x < 1417,
		});
	}

	fixOffset(e, obj) {
		const differenceX = canvas.getBoundingClientRect().width / canvas.width;
		const x = e.offsetX / differenceX;
		const differenceY = window.innerHeight / canvas.height;
		const y = e.offsetY / differenceY;
		return (obj = {
			x: x,
			y: y,
		});
	}

	detectEl(detectEl) {
		detectEl ? this.cursorPointer() : this.cursorDefault();
		this.menu.sceneElement = detectEl;
	}

	hover() {
		canvas.addEventListener('mousemove', e => {
			this.sceneWatcher();
			const { x, y } = this.fixOffset(e, {});
			const area = this.areas(x, y, {});
			let detectEl = false;
			switch (this.scene) {
				case 'startingMenu':
					switch (this.menu.scene) {
						case 'menuMain':
							area.mainStart.btn1 && (detectEl = 'btn1');
							area.mainStart.btn2 && (detectEl = 'btn2');
							area.mainStart.btn3 && (detectEl = 'btn3');
							break;
						case 'playMain':
							area.mainStart.arrowLeft && (detectEl = 'arrowLeft');
							area.mainStart.arrowRight && (detectEl = 'arrowRight');
							area.mainStart.btn3 && (detectEl = 'btn3');
							break;
						case 'optionsMain':
							area.mainStart.btn1 && (detectEl = 'btn1');
							area.mainStart.btn2 && (detectEl = 'btn2');
							area.mainStart.btn3 && (detectEl = 'btn3');
							break;
						case 'creditsMain':
							area.mainStart.btn3 && (detectEl = 'btn3');
							break;
					}
					this.detectEl(detectEl);
					break;
				case 'snake':
					switch (this.menu.scene) {
						case 'menuSnake':
						case 'difficultySnake':
						case 'optionsSnake':
							area.snake.btn1 && (detectEl = 'btn1');
							area.snake.btn2 && (detectEl = 'btn2');
							area.snake.btn3 && (detectEl = 'btn3');
							break;
						case 'boardSnake':
							area.snake.btn1 && (detectEl = 'btn1');
							area.snake.board1Snake && (detectEl = 'board1Snake');
							area.snake.board2Snake && (detectEl = 'board2Snake');
							area.snake.btn3 && (detectEl = 'btn3');
							break;
						case 'easySnake':
						case 'hardSnake':
						case 'gameOverEasySnake':
						case 'gameOverHardSnake':
							area.snake.btn2 && (detectEl = 'btn2');
							area.snake.btn3 && (detectEl = 'btn3');
							break;
					}
					this.detectEl(detectEl);
					break;
			}
			switch (this.npcScene) {
				case 'npcDominik':
					area.npc
						? this.cursorPointer() && (this.npcHoverFlag = true)
						: this.cursorDefault() && (this.npcHoverFlag = false);
					break;
				default:
					break;
			}
		});
	}

	playerNumberForChoosePlayerRight() {
		this.playerNumber++;
		localStorage.setItem('playerNumber', `${this.playerNumber}`);
		if (localStorage.getItem('playerNumber') > 7) {
			this.playerNumber = 0;
			localStorage.setItem('playerNumber', `${this.playerNumber}`);
		}
	}

	playerNumberForChoosePlayerLeft() {
		this.playerNumber--;
		localStorage.setItem('playerNumber', `${this.playerNumber}`);
		if (localStorage.getItem('playerNumber') < 0) {
			this.playerNumber = 7;
			localStorage.setItem('playerNumber', `${this.playerNumber}`);
		}
	}

	dialogueCounting() {
		if (
			this.game.npc.dialogueCountingFlag &&
			(this.game.npc.npcConversation === 1 || this.game.npc.npcConversation === 4)
		) {
			this.game.npc.dialogueCountingFlag = false;
			this.game.npc.dialogueNumber++;
		}
	}

	npcDialogueResetPack({
		npcConversation = { nr },
		npcConversationToLocalStorage = { flag: false },
		dialog = { flag: false },
		sound = { flag: false },
	}) {
		npcConversationToLocalStorage.flag && localStorage.setItem('npcConversation', npcConversation.nr);
		this.game.npc.npcConversation = npcConversation.nr;
		this.game.npc.npcScene = null;
		this.npcScene = null;
		this.game.sceneSwitcher.activeNpcFlag = false;
		this.game.npc.npcCollisionArray = [];
		this.game.npc.arrayStopFlag = false;
		this.npcHoverFlag = false;
		dialog.flag && (this.game.npc.dialogueFlag = false);
		sound.flag && (this.game.npc.soundFlag.npcDominik.conversation2_3_5_6.sound1 = false);
	}

	npcDialogueBtn() {
		this.dialogueCounting();

		if (
			this.game.npc.npcScene === 'npcDominik' &&
			this.game.npc.npcConversation === 1 &&
			this.game.npc.questTextFlag &&
			this.game.npc.character.characterPosition.x === 45.1 * 128 + this.game.gameSetup.position.x &&
			this.game.npc.character.characterPosition.y === 33.5 * 128 + this.game.gameSetup.position.y
		) {
			this.npcDialogueResetPack({ npcConversation: { nr: 2 }, npcConversationToLocalStorage: { flag: true } });
			this.game.npc.dialogueCountingFlag = false;
			this.game.npc.dialogueNumber = 1;
			this.game.npc.questTextFlag = false;

			this.game.npc.character.spriteSetup.frameY = 0;
		}

		if (this.game.npc.npcScene === 'npcDominik' && this.game.npc.npcConversation === 2) {
			this.npcDialogueResetPack({ npcConversation: { nr: 3 }, dialog: { flag: true }, sound: { flag: true } });
		}
		if (this.game.npc.npcScene === 'npcDominik' && this.game.npc.npcConversation === 3) {
			this.npcDialogueResetPack({ npcConversation: { nr: 2 }, dialog: { flag: true }, sound: { flag: true } });
		}
		if (this.game.npc.npcScene === 'npcDominik' && this.game.npc.npcConversation === 4 && this.game.npc.questTextFlag) {
			this.npcDialogueResetPack({
				npcConversation: { nr: 5 },
				npcConversationToLocalStorage: { flag: true },
				dialog: { flag: true },
			});
			this.game.npc.dialogueCountingFlag = false;
			this.game.npc.dialogueNumber = 1;
			this.game.npc.questTextFlag = false;
		}

		if (this.game.npc.npcScene === 'npcDominik' && this.game.npc.npcConversation === 5) {
			this.npcDialogueResetPack({ npcConversation: { nr: 6 }, dialog: { flag: true }, sound: { flag: true } });
		}
		if (this.game.npc.npcScene === 'npcDominik' && this.game.npc.npcConversation === 6) {
			this.npcDialogueResetPack({ npcConversation: { nr: 5 }, dialog: { flag: true }, sound: { flag: true } });
		}
	}

	selectAudio() {
		audioSettings.select.play();
		this.clickFlag = true;
	}

	click() {
		canvas.addEventListener('click', e => {
			this.sceneWatcher();
			const { x, y } = this.fixOffset(e, {});
			const area = this.areas(x, y, {});

			if (!this.clickFlag) {
				switch (this.scene) {
					case 'startingMenu':
						switch (this.menu.scene) {
							case 'menuMain':
								area.mainStart.btn1 && (this.menu.scene = 'playMain');
								area.mainStart.btn1 && this.selectAudio();
								area.mainStart.btn2 && (this.menu.scene = 'optionsMain');
								area.mainStart.btn2 && this.selectAudio();
								area.mainStart.btn3 && (this.menu.scene = 'creditsMain');
								area.mainStart.btn3 && this.selectAudio();

								break;
							case 'playMain':
								area.mainStart.arrowLeft && this.playerNumberForChoosePlayerLeft();
								area.mainStart.arrowLeft && this.selectAudio();
								area.mainStart.arrowRight && this.playerNumberForChoosePlayerRight();
								area.mainStart.arrowRight && this.selectAudio();
								if (area.mainStart.btn3) {
									localStorage.setItem('scene', 'prepareToMain');
									this.menu.scene = 'menuMain';
									this.startFlagMain = false;
									this.cursorDefault();
									audioSettings.start.play();
									this.clickFlag = true;
								}
								break;
							case 'optionsMain':
								if (area.mainStart.btn1) {
									if (localStorage.getItem('musicOff')) {
										localStorage.removeItem('musicOff');
										this.selectAudio();
									} else {
										localStorage.setItem('musicOff', true);
									}
								}
								if (area.mainStart.btn2) {
									if (localStorage.getItem('sfxOff')) {
										localStorage.removeItem('sfxOff');
										this.selectAudio();
									} else {
										localStorage.setItem('sfxOff', true);
									}
								}
								area.mainStart.btn3 && (this.menu.scene = 'menuMain');
								area.mainStart.btn3 && this.selectAudio();
								break;
							case 'creditsMain':
								area.mainStart.btn3 && (this.menu.scene = 'menuMain');
								area.mainStart.btn3 && this.selectAudio();
								break;
						}
						break;
					case 'snake':
						switch (this.menu.scene) {
							case 'menuSnake':
								area.snake.btn1 && (this.menu.scene = 'boardSnake');
								area.snake.btn1 && this.selectAudio();
								area.snake.btn2 && (this.menu.scene = 'optionsSnake');
								area.snake.btn2 && this.selectAudio();
								if (area.snake.btn3) {
									localStorage.setItem('scene', 'main');
									this.menu.scene = 'menuMain';
									this.menuFlagSnake = false;
									this.cursorDefault();
									audioSettings.snake.stop();
									audioSettings.main.play();
									audioSettings.start.play();
									this.clickFlag = true;
								}
								break;
							case 'boardSnake':
								area.snake.btn1 && (this.menu.scene = 'difficultySnake');
								area.snake.btn1 && this.selectAudio();
								area.snake.board1Snake && (this.menu.selected.board = 'board1Snake');
								area.snake.board1Snake && this.selectAudio();
								area.snake.board2Snake && (this.menu.selected.board = 'board2Snake');
								area.snake.board2Snake && this.selectAudio();
								area.snake.btn3 && (this.menu.scene = 'menuSnake');
								area.snake.btn3 && this.selectAudio();

								break;
							case 'difficultySnake':
								area.snake.btn1 && (this.menu.scene = 'easySnake') && this.cursorDefault();
								area.snake.btn1 && this.selectAudio();
								area.snake.btn2 && (this.menu.scene = 'hardSnake');
								area.snake.btn2 && this.selectAudio();
								area.snake.btn3 && (this.menu.scene = 'boardSnake');
								area.snake.btn3 && this.selectAudio();
								break;
							case 'easySnake':
								if (area.snake.btn2) {
									this.menu.scene = 'prepareToStartEasySnake';
									this.cursorDefault();
									audioSettings.snakeHissing.play();
									this.clickFlag = true;
								}
								area.snake.btn3 && (this.menu.scene = 'difficultySnake');
								area.snake.btn3 && this.selectAudio();

								break;
							case 'hardSnake':
								if (area.snake.btn2) {
									this.menu.scene = 'prepareToStartHardSnake';
									this.cursorDefault();
									audioSettings.snakeHissing.play();
									this.clickFlag = true;
								}
								area.snake.btn3 && (this.menu.scene = 'difficultySnake');
								area.snake.btn3 && this.selectAudio();
								break;
							case 'gameOverEasySnake':
								if (area.snake.btn2) {
									this.menu.scene = 'retryEasySnake';
									this.cursorDefault();
									audioSettings.gameOver.stop();
									audioSettings.gameOverVoiceover.stop();
									audioSettings.snakeHissing.play();
									audioSettings.snake.play();
									this.clickFlag = true;
								}
								if (area.snake.btn3) {
									this.menu.scene = 'menuSnake';
									audioSettings.gameOver.stop();
									audioSettings.gameOverVoiceover.stop();
									audioSettings.snake.play();
									this.selectAudio();
								}
								break;
							case 'gameOverHardSnake':
								if (area.snake.btn2) {
									this.menu.scene = 'retryHardSnake';
									this.cursorDefault();
									audioSettings.gameOver.stop();
									audioSettings.gameOverVoiceover.stop();
									audioSettings.snakeHissing.play();
									audioSettings.snake.play();
									this.clickFlag = true;
								}
								if (area.snake.btn3) {
									this.menu.scene = 'menuSnake';
									audioSettings.gameOver.stop();
									audioSettings.gameOverVoiceover.stop();
									audioSettings.snake.play();
									this.selectAudio();
								}
								break;
							case 'optionsSnake':
								if (area.snake.btn1) {
									if (localStorage.getItem('musicOff')) {
										localStorage.removeItem('musicOff');
										this.selectAudio();
									} else {
										localStorage.setItem('musicOff', true);
									}
								}
								if (area.snake.btn2) {
									if (localStorage.getItem('sfxOff')) {
										localStorage.removeItem('sfxOff');
										this.selectAudio();
									} else {
										localStorage.setItem('sfxOff', true);
									}
								}
								area.snake.btn3 && (this.menu.scene = 'menuSnake');
								area.snake.btn3 && this.selectAudio();
								break;
						}
						break;

					default:
						this.cursorDefault();
				}

				switch (this.npcScene) {
					case 'npcDominik':
						area.npc && this.npcDialogueBtn();
						area.npc && this.selectAudio();
						area.npc && this.cursorPointer();
						break;
				}
				!this.npcScene && area.npc && this.cursorDefault();
			}
		});

		canvas.addEventListener('mouseup', e => {
			const { x, y } = this.fixOffset(e, {});
			const area = this.areas(x, y, {});

			switch (this.scene) {
				case 'startingMenu':
					break;
			}

			if (
				area.mainStart.btn1 ||
				area.mainStart.btn2 ||
				area.mainStart.btn3 ||
				area.mainStart.arrowLeft ||
				area.mainStart.arrowRight ||
				area.snake.btn1 ||
				area.snake.btn2 ||
				area.snake.btn3 ||
				area.snake.board1Snake ||
				area.snake.board1Snake ||
				area.npc
			) {
				if (this.clickFlag) {
					this.clickFlag = false;
				}
			}
		});
	}

	sceneWatcher() {
		this.scene = localStorage.getItem('scene') || 'startingMenu';
		if (localStorage.getItem('gameOverEasySnake')) {
			audioSettings.select.volume(1);
			this.menu.scene = 'gameOverEasySnake';
			localStorage.removeItem('gameOverEasySnake');
		}
		if (localStorage.getItem('gameOverHardSnake')) {
			audioSettings.select.volume(1);
			this.menu.scene = 'gameOverHardSnake';
			localStorage.removeItem('gameOverHardSnake');
		}

		if (this.menu.scene === 'prepareToStartEasySnake' || this.menu.scene === 'retryEasySnake') {
			setTimeout(() => {
				this.menu.scene = 'startEasySnake';
			}, 100);
		}

		if (this.menu.scene === 'prepareToStartHardSnake' || this.menu.scene === 'retryHardSnake') {
			setTimeout(() => {
				this.menu.scene = 'startHardSnake';
			}, 100);
		}

		if (this.scene === 'prepareToMain') {
			if (!this.startFlagMain) {
				this.startFlagMain = true;
				setTimeout(() => {
					localStorage.setItem('scene', 'main');
				}, 350);
			}
		}

		if (this.scene === 'snake' && this.menuFlagSnake === false) {
			this.menu.scene = 'menuSnake';
			this.menuFlagSnake = true;
		}
	}
}
