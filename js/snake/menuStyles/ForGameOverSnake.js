import { MainAreaSnake } from './MainAreaSnake.js';
import { HeaderSnake } from './HeaderSnake.js';
import { CreateButtonSnake } from './CreateButtonSnake.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';

export class ForGameOverSnake {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, { color: 'rgba(71, 200, 85, 0.8)' });
		this.draw(this.ctx);
	}

	styles() {
		this.mainArea = new MainAreaSnake(this);
		this.header = new HeaderSnake(this, { words: ['Game', 'Over'], x: -102, y: 89, fontSize: 48, wordSpacing: 8 });
		this.btn2 = new CreateButtonSnake(this, {
			offsetY: 10,
			word: ['Retry'],
			textOffset: { x: -50, y: 270 },
		});
		this.btn3 = new CreateButtonSnake(this, {
			offsetY: 96,
			word: ['Menu'],
			textOffset: { x: -50, y: 357 },
		});
	}
	draw(ctx) {
		this.styles(ctx);
		this.mainArea.draw(ctx);
		this.header.draw(ctx);
		this.btn2.draw(ctx);
		this.btn3.draw(ctx);
		this.menuHoverStyle.draw(ctx, {
			btn2: { x: 5, flag: true },
			btn3: { x: 5, flag: true },
		});
	}
}
