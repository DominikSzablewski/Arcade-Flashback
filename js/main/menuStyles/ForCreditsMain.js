import { MenuBackgroundMain } from '../Background.js';
import { MainArea } from './MainArea.js';
import { Header } from './Header.js';
import { CreateButton } from './CreateButton.js';
import { MenuHoverStyle } from '../../main/menuStyles/MenuHoverStyle.js';
import { TextBasicSetup } from '../Text.js';

export class ForCreditsMain {
	constructor(menu, ctx) {
		this.menu = menu;
		this.ctx = ctx;
		this.menuHoverStyle = new MenuHoverStyle(this, this.menu.game.menuSceneEl, { color: 'rgba(255, 73, 246, 1)' });
		this.textBasicSetup = new TextBasicSetup(this.menu.game);
		this.draw(this.ctx);
	}
	styles() {
		this.background = new MenuBackgroundMain();
		this.mainArea = new MainArea(this);
		this.header = new Header(this, { words: ['Credits'], x: -122 });
		this.textBasicSetup.text({
			setup: { nr: 'text1', x: -310, y: -120 },
			text: ['The code is created solely by myself, while the'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text2', x: -285, y: -80 },
			text: ['images and sounds used in this project are'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text3', x: -292, y: -40 },
			text: ['sourced from free platforms. To familiarize'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text4', x: -275, y: 0 },
			text: ['yourself with the credits, please visit my'],
		});
		this.textBasicSetup.text({
			setup: { nr: 'text5', x: -298, y: 40 },
			text: ['GitHub page and refer to the README file at:'],
		});
		if (!(this.menuHoverStyle.menuSceneEl === 'creditsLink')) {
			this.textBasicSetup.text({
				setup: { nr: 'text6', x: -325, y: 100 },
				font: { size: '24px', color: '0, 239, 255, 1.0', shadowColor: '0, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
				text: ['https://github.com/DominikSzablewski/Arcade-Flashback'],
			});
		} else {
			this.textBasicSetup.text({
				setup: { nr: 'text6', x: -325, y: 100 },
				font: { size: '24px', color: '0, 200, 100, 1.0', shadowColor: '0, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
				text: ['https://github.com/DominikSzablewski/Arcade-Flashback'],
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
		this.textBasicSetup.text1.draw(ctx);
		this.textBasicSetup.text2.draw(ctx);
		this.textBasicSetup.text3.draw(ctx);
		this.textBasicSetup.text4.draw(ctx);
		this.textBasicSetup.text5.draw(ctx);
		this.textBasicSetup.text6.draw(ctx);
		this.btn3.draw(ctx);
		this.menuHoverStyle.draw(ctx, {
			btn3: { x: 5, flag: true },
		});
	}
}
