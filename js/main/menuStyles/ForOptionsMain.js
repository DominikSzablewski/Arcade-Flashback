import { MenuBackgroundMain } from '../Background.js';
import { MainArea } from './MainArea.js';
import { Header } from './Header.js';
import { CreateButton } from './CreateButton.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';

export class ForOptionsMain {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, this.menu.game.menuSceneEl, { color: 'rgba(255, 73, 246, 1)' });
		this.musicOff = localStorage.getItem('musicOff');
		this.sfxOff = localStorage.getItem('sfxOff');
		this.draw(this.ctx);
	}
	styles() {
		this.background = new MenuBackgroundMain();
		this.mainArea = new MainArea(this);
		this.header = new Header(this, { words: ['Menu'], x: -85 });

		if (this.musicOff) {
			this.btn1 = new CreateButton(this, {
				offset: { x: 0, y: -58 },
				word: ['Music: Off'],
				textOffset: { x: -100, y: -43 },
			});
		} else {
			this.btn1 = new CreateButton(this, {
				offset: { x: 0, y: -58 },
				word: ['Music: On'],
				textOffset: { x: -94, y: -43 },
			});
		}
		if (this.sfxOff) {
			this.btn2 = new CreateButton(this, {
				offset: { x: 0, y: 70 },
				word: ['SFX: Off'],
				textOffset: { x: -78, y: 84 },
			});
		} else {
			this.btn2 = new CreateButton(this, {
				offset: { x: 0, y: 70 },
				word: ['SFX: On'],
				textOffset: { x: -72, y: 84 },
			});
		}

		this.btn3 = new CreateButton(this, {
			offset: { x: 0, y: 198 },
			word: ['Back'],
			textOffset: { x: -45, y: 213 },
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
			btn2: { x: 8, flag: true },
			btn3: { x: 5, flag: true },
		});
	}
}
