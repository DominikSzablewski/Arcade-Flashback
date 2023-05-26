import { MainAreaSnake } from './MainAreaSnake.js';
import { HeaderSnake } from './HeaderSnake.js';
import { CreateButtonSnake } from './CreateButtonSnake.js';
import { MenuHoverStyle } from '../../main/MenuHoverStyle.js';

export class ForMenuSnake {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, { color: 'rgba(71, 200, 85, 0.8)' });
		this.draw(this.ctx);
	}

	styles() {
		this.mainArea = new MainAreaSnake(this);
		this.header = new HeaderSnake(this, { words: ['Menu'], x: -78 });
		this.btn1 = new CreateButtonSnake(this, {
			offsetY: -75,
			word: ['New', 'Game'],
			textOffset: { x: -95, y: 185.5 },
		});
		this.btn2 = new CreateButtonSnake(this, {
			offsetY: 10,
			word: ['Options'],
			textOffset: { x: -74, y: 268 },
		});
		this.btn3 = new CreateButtonSnake(this, {
			offsetY: 96,
			word: ['Exit'],
			textOffset: { x: -38, y: 357 },
		});
	}

	draw(ctx) {
		this.styles();
		this.mainArea.draw(ctx);
		this.header.draw(ctx);
		this.btn1.draw(ctx);
		this.btn2.draw(ctx);
		this.btn3.draw(ctx);
		this.menuHoverStyle.draw(ctx, {
			btn1: { x: 10, flag: true },
			btn2: { x: 11, flag: true },
			btn3: { x: 6, flag: true },
		});
	}
}
