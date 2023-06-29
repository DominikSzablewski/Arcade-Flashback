import { TextBasicSetup } from '../../main/Text.js';
import { MainAreaSnake } from './MainAreaSnake.js';
import { HeaderSnake } from './HeaderSnake.js';
import { CreateButtonSnake } from './CreateButtonSnake.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';

export class ForEasySnake {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, this.menu.snake.game.menuSceneEl, {
			color: 'rgba(71, 200, 85, 0.8)',
		});
		this.textBasicSetup = new TextBasicSetup(this.menu.snake.game);
		this.draw(this.ctx);
	}

	styles() {
		this.mainArea = new MainAreaSnake(this);
		this.header = new HeaderSnake(this, { words: ['Easy'], x: -64, y: 91 });
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
			setup: { nr: 'text1', x: -135, y: -38 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['Mr', 'Snake', 'has', 'no', 'taste', 'for', 'anything'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text2', x: -126, y: -21 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['but', 'apples.', 'There', 'is', 'no', 'reason', 'to'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text3', x: -115, y: -4 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['worry', 'about', 'the', 'tail.', 'However,'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text4', x: -100, y: 13 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['beware', 'of', 'any', 'of', 'the', 'walls'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text5', x: -100, y: 30 },
			font: { size: '16px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
			text: ['-', 'they', 'can', 'be', 'dangerous.'],
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
