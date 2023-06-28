import { MainAreaSnake } from './MainAreaSnake.js';
import { HeaderSnake } from './HeaderSnake.js';
import { CreateButtonSnake } from './CreateButtonSnake.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';

export class ForOptionsSnake {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, { color: 'rgba(71, 200, 85, 0.8)' });
		this.musicOff = localStorage.getItem('musicOff');
		this.sfxOff = localStorage.getItem('sfxOff');
		this.draw(this.ctx);
	}

	styles() {
		this.mainArea = new MainAreaSnake(this);
		this.header = new HeaderSnake(this, { words: ['Options'], x: -108, y: 93 });

		if (this.musicOff) {
			this.btn1 = new CreateButtonSnake(this, {
				offsetY: -75,
				word: ['Music: Off'],
				textOffset: { x: -99.5, y: 185.5 },
			});
		} else {
			this.btn1 = new CreateButtonSnake(this, {
				offsetY: -75,
				word: ['Music: On'],
				textOffset: { x: -95, y: 185.5 },
			});
		}
		if (this.sfxOff) {
			this.btn2 = new CreateButtonSnake(this, {
				offsetY: 10,
				word: ['SFX: Off'],
				textOffset: { x: -76, y: 271.5 },
			});
		} else {
			this.btn2 = new CreateButtonSnake(this, {
				offsetY: 10,
				word: ['SFX: On'],
				textOffset: { x: -70, y: 271.5 },
			});
		}

		this.btn3 = new CreateButtonSnake(this, {
			offsetY: 96,
			word: ['Back'],
			textOffset: { x: -44, y: 357 },
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
			btn2: { x: 7, flag: true },
			btn3: { x: 5, flag: true },
		});
	}
}
