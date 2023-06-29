import { Image } from '../../main/Image.js';
export class MainAreaSnake {
	constructor(menuElement) {
		this.menuElement = menuElement;
		this.mainArea = new Image({
			src: { id: 'menuAreaSnake' },
			size: { width: 1152, height: 1491 },
			offsetSize: { x: 30, y: 3 },
			position: {
				x:
					this.menuElement.menu.snake.boardSetup.x +
					this.menuElement.menu.snake.boardSetup.width / 2 -
					(1152 * 0.3) / 2,
				y:
					this.menuElement.menu.snake.boardSetup.y +
					this.menuElement.menu.snake.boardSetup.height / 2 -
					(1491 * 0.3) / 2,
			},
			offsetPosition: { x: -2, y: 9 },
			positionOnImage: { x: 0, y: 0 },
			edit: { resize: 0.3 },
		});
	}
	draw(ctx) {
		this.mainArea.draw(ctx);
	}
}
