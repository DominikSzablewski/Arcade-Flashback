export class MenuHoverStyle {
	constructor(menuElement, menuSceneEl, { color }) {
		this.menuElement = menuElement;
		this.menuSceneEl = menuSceneEl;
		this.color = color;
	}
	draw(ctx, { btn1 = { x: 0, flag: false }, btn2 = { x: 0, flag: false }, btn3 = { x: 0, flag: false } }) {
		this.style = (ctx, el) => {
			this.menuElement[el].text.font.size = '40px';
			this.menuElement[el].text.font.color = this.color;
			this.menuElement[el].text.position.y += -1;
			this.menuElement[el].draw(ctx);
		};
		switch (this.menuSceneEl) {
			case 'btn1':
				if (btn1.flag) {
					this.menuElement[this.menuSceneEl].text.position.x += btn1.x;
					this.style(ctx, this.menuSceneEl);
				}
				break;
			case 'btn2':
				if (btn2.flag) {
					this.menuElement[this.menuSceneEl].text.position.x += btn2.x;
					this.style(ctx, this.menuSceneEl);
				}
				break;
			case 'btn3':
				if (btn3.flag) {
					this.menuElement[this.menuSceneEl].text.position.x += btn3.x;
					this.style(ctx, this.menuSceneEl);
				}
				break;
		}
	}
}
