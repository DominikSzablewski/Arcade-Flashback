import { twoDimensionalArrayData } from '../data/collisionData.js';
class TileForCollision {
	constructor(game, { tile = { x, y } }) {
		this.game = game;
		this.tile = tile;
		this.MapZoom = 4;
		this.collisionSetup = {
			width: 32 * this.MapZoom,
			height: 32 * this.MapZoom,
			collision: false,
		};
		this.position = {
			x: this.tile.x * this.collisionSetup.width + this.game.gameSetup.x,
			y: this.tile.y * this.collisionSetup.height + this.game.gameSetup.y,
		};
		this.devMode = this.game.gameSetup.devMode ? 0.5 : 0;
	}

	draw(ctx) {
		ctx.fillStyle = `rgba(255, 0, 0, ${this.devMode})`;
		ctx.fillRect(this.position.x, this.position.y, this.collisionSetup.width, this.collisionSetup.height);
	}
}

export class TilesForCollision {
	constructor(game) {
		this.game = game;
		this.array = [];
		this.draw();
	}
	draw() {
		for (const [indexRow, elementRow] of twoDimensionalArrayData.entries()) {
			for (const [indexColumn, elementColumn] of elementRow.entries()) {
				if (elementColumn === 2500) {
					this.array.push(new TileForCollision(this.game, { tile: { x: indexRow, y: indexColumn } }));
				}
			}
		}
	}
}
