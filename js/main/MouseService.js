const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#canvas1'));
canvas.width = 1900;
canvas.height = 900;

export class MouseService {
	constructor() {
		this.menu = {
			sceneElement: false,
			scene: 'menuMain', //menu/board/options/game/exit
			selected: { board: 'board1Snake' },
		};
		this.menuFlagSnake = false;
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
						case 'newGameMain':
							area.mainStart.arrowLeft && (detectEl = 'arrowLeft');
							area.mainStart.arrowRight && (detectEl = 'arrowRight');
							area.mainStart.btn3 && (detectEl = 'btn3');
							break;
					}
					this.detectEl(detectEl);
					break;
				case 'snake':
					switch (this.menu.scene) {
						case 'menuSnake':
						case 'difficultySnake':
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

	click() {
		canvas.addEventListener('click', e => {
			this.sceneWatcher();
			const { x, y } = this.fixOffset(e, {});
			const area = this.areas(x, y, {});
			switch (this.scene) {
				case 'startingMenu':
					switch (this.menu.scene) {
						case 'menuMain':
							area.mainStart.btn1 && (this.menu.scene = 'newGameMain');
							break;
						case 'newGameMain':
							area.mainStart.arrowLeft && this.playerNumberForChoosePlayerLeft();
							area.mainStart.arrowRight && this.playerNumberForChoosePlayerRight();
							if (area.mainStart.btn3) {
								localStorage.setItem('scene', 'prepareToMain');
								this.cursorDefault();
								document.location.reload();
							}
							break;
					}
					break;
				case 'snake':
					switch (this.menu.scene) {
						case 'menuSnake':
							area.snake.btn1 && (this.menu.scene = 'boardSnake');
							if (area.snake.btn3) {
								localStorage.setItem('scene', 'main');
								this.menu.scene = 'menuMain';
								this.menuFlagSnake = false;
								this.cursorDefault();
							}

							break;
						case 'boardSnake':
							area.snake.btn1 && (this.menu.scene = 'difficultySnake');
							area.snake.board1Snake && (this.menu.selected.board = 'board1Snake');
							area.snake.board2Snake && (this.menu.selected.board = 'board2Snake');
							area.snake.btn3 && (this.menu.scene = 'menuSnake');
							break;
						case 'difficultySnake':
							area.snake.btn1 && (this.menu.scene = 'easySnake') && this.cursorDefault();
							area.snake.btn2 && (this.menu.scene = 'hardSnake');
							area.snake.btn3 && (this.menu.scene = 'boardSnake');
							break;
						case 'easySnake':
							area.snake.btn2 && (this.menu.scene = 'prepareToStartEasySnake') && this.cursorDefault();
							area.snake.btn3 && (this.menu.scene = 'difficultySnake');

							break;
						case 'hardSnake':
							area.snake.btn2 && (this.menu.scene = 'prepareToStartHardSnake') && this.cursorDefault();
							area.snake.btn3 && (this.menu.scene = 'difficultySnake');
							break;
						case 'gameOverEasySnake':
							area.snake.btn2 && (this.menu.scene = 'retryEasySnake');
							area.snake.btn3 && (this.menu.scene = 'menuSnake');
							break;
						case 'gameOverHardSnake':
							area.snake.btn2 && (this.menu.scene = 'retryHardSnake');
							area.snake.btn3 && (this.menu.scene = 'menuSnake');
							break;
					}
					break;
				default:
					this.cursorDefault();
			}
		});
	}

	sceneWatcher() {
		this.scene = localStorage.getItem('scene') || 'startingMenu';
		if (localStorage.getItem('gameOverEasySnake') === 'true') {
			this.menu.scene = 'gameOverEasySnake';
			localStorage.removeItem('gameOverEasySnake');
		}
		if (localStorage.getItem('gameOverHardSnake') === 'true') {
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
			setTimeout(() => {
				localStorage.setItem('scene', 'main');
			}, 350);
		}

		if (this.scene === 'snake' && this.menuFlagSnake === false) {
			this.menu.scene = 'menuSnake';
			this.menuFlagSnake = true;
		}
	}
}
