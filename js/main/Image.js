export class Image {
	constructor({
		src = { id },
		size = { width, height },
		position = { x, y },
		positionOnImage = { x, y },
		edit = { resize },
		offsetSize = { x, y },
		offsetPosition = { x, y },
	}) {
		this.src = src;
		this.image = document.getElementById(this.src.id);
		this.size = size;
		this.position = position;
		this.positionOnImage = positionOnImage;
		this.edit = edit;
		this.offsetSize = offsetSize;
		this.offsetPosition = offsetPosition;
	}

	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.positionOnImage.x,
			this.positionOnImage.y,
			this.size.width,
			this.size.height,
			this.position.x + this.offsetPosition.x,
			this.position.y + this.offsetPosition.y,
			this.size.width * this.edit.resize + this.offsetSize.x,
			this.size.height * this.edit.resize + this.offsetSize.y
		);
	}
}
