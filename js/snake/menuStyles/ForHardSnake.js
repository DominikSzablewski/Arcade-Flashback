import { TextBasicSetup } from '../../main/Text.js';
import { MainAreaSnake } from './MainAreaSnake.js';
import { HeaderSnake } from './HeaderSnake.js';
import { CreateButtonSnake } from './CreateButtonSnake.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';

export class ForHardSnake {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, { color: 'rgba(71, 200, 85, 0.8)' });
		this.textBasicSetup = new TextBasicSetup(this.menu.snake.game);
		this.draw(this.ctx);
	}

	styles() {
		this.mainArea = new MainAreaSnake(this);
		this.header = new HeaderSnake(this, { words: ['Hard'], x: -64 });

		this.btn2 = new CreateButtonSnake(this, {
			offsetY: 10,
			word: ['Start'],
			textOffset: { x: -48, y: 270 },
		});
		this.btn3 = new CreateButtonSnake(this, {
			offsetY: 96,
			word: ['Back'],
			textOffset: { x: -44, y: 357 },
		});
		this.textBasicSetup.text({
			setup: { nr: 'text1', x: -126.5, y: -38 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['Mr', "Snake's", 'lust', 'is', 'out', 'of', 'control.'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text2', x: -126, y: -21 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['Agility', 'and', 'prudence', 'are', 'needed.'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text3', x: -133, y: -4 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['I', 'suggest', 'trying', 'to', 'devour', 'only', 'the'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text4', x: -131, y: 13 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['apples', 'and', 'avoid', 'close', 'encounters'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text5', x: -89.5, y: 30 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['with', 'walls', 'and', 'the', 'tail.'],
		});
	}

	draw(ctx) {
		this.styles();
		this.mainArea.draw(ctx);
		this.header.draw(ctx);
		this.btn2.draw(ctx);
		this.btn3.draw(ctx);
		this.textBasicSetup.text1.draw(ctx);
		this.textBasicSetup.text2.draw(ctx);
		this.textBasicSetup.text3.draw(ctx);
		this.textBasicSetup.text4.draw(ctx);
		this.textBasicSetup.text5.draw(ctx);
		this.menuHoverStyle.draw(ctx, {
			btn2: { x: 5, flag: true },
			btn3: { x: 5, flag: true },
		});
	}
}
