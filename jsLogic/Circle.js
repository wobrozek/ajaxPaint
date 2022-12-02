import { Tool } from './Tool.js';

export class Circle extends Tool {
	constructor() {
		super();
	}

	onPointerMove(x, y, ctx1, ctx2, width, height) {
		if (this._drawing) {
			ctx2.clearRect(0, 0, width, height);
			let distance = Math.sqrt(
				Math.pow(this._data['coordinates'][0][0] - x, 2) + Math.pow(this._data['coordinates'][0][1] - y, 2),
				2
			);
			ctx2.arc(this._data['coordinates'][0][0], this._data['coordinates'][0][1], distance, 0, 2 * Math.PI);
			ctx2.stroke();
			ctx2.beginPath();
		}
	}

	onPointerUp(x, y, ctx, ctx2, widht, height) {
		this._data['type'] = 'circle';
		let distance = Math.sqrt(
			Math.pow(this._data['coordinates'][0][0] - x, 2) + Math.pow(this._data['coordinates'][0][1] - y, 2),
			2
		);
		this._data['coordinates'].push([ distance, 0 ]);
		super.onPointerUp(x, y, ctx, ctx2, widht, height);
	}

	draw(data, ctx) {
		ctx.beginPath();
		ctx.strokeStyle = data['color'];
		ctx.lineWidth = data['width'];
		ctx.arc(data['coordinates'][0][0], data['coordinates'][0][1], data['coordinates'][1][0], 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
	}
}
