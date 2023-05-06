export class Score {
	constructor({ text, position = { x, y } }) {
		this.text = text;
		this.position = position;
		this.point = 0;
	}
	draw(ctx) {
		ctx.font = '30px VT323';
		ctx.fillStyle = 'RGBA(255, 255, 255, 1.0)';
		ctx.fillText(`${this.text}: ${this.point}`, this.position.x, this.position.y);
	}
}
