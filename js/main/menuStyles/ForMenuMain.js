import { MenuBackgroundMain } from '../Background.js';
import { MainArea } from './MainArea.js';
import { Header } from './Header.js';
import { CreateButton } from './CreateButton.js';

export class ForMenuMain {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.draw(this.ctx);
	}
	styles() {
		this.background = new MenuBackgroundMain();
		this.mainArea = new MainArea(this);
		this.header = new Header(this, { words: ['Menu'], x: -85 });
		this.btn1 = new CreateButton(this, {
			offset: { x: 0, y: -58 },
			word: ['New', 'Game'],
			textOffset: { x: -95, y: -43 },
		});
		this.btn2 = new CreateButton(this, {
			offset: { x: 0, y: 70 },
			word: ['Options'],
			textOffset: { x: -72, y: 84 },
		});
		this.btn3 = new CreateButton(this, {
			offset: { x: 0, y: 198 },
			word: ['Credits'],
			textOffset: { x: -70, y: 213 },
		});
	}

	draw(ctx) {
		this.styles();
		this.background.image.draw(ctx);
		this.mainArea.draw(ctx);
		this.header.draw(ctx);
		this.btn1.draw(ctx);
		this.btn2.draw(ctx);
		this.btn3.draw(ctx);
	}
}
