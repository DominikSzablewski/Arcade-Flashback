import { MenuBackgroundMain } from '../Background.js';
import { MainArea } from './MainArea.js';
import { Header } from './Header.js';
import { CreateButton } from './CreateButton.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';

export class ForMenuMain {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, this.menu.game.menuSceneEl, { color: 'rgba(255, 73, 246, 1)' });
		this.draw(this.ctx);
	}
	styles() {
		this.background = new MenuBackgroundMain();
		this.mainArea = new MainArea(this);
		this.header = new Header(this, { words: ['Menu'], x: -85 });
		this.btn1 = new CreateButton(this, {
			offset: { x: 0, y: -58 },
			word: ['Play'],
			textOffset: { x: -40, y: -43 },
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
		this.menuHoverStyle.draw(ctx, {
			btn1: { x: 10, flag: true },
			btn2: { x: 7, flag: true },
			btn3: { x: 5, flag: true },
		});
	}
}
