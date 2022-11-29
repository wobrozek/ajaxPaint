import { Tool } from './Tool.js';

export class Line extends Tool {
	constructor() {
		super();
		this._drawing = false;
	}

	onPointerMove(x, y, ctx1, ctx2, width, height) {
		if (this._drawing) {
			ctx2.clearRect(0, 0, width, height);
			ctx2.moveTo(this._data['coordinates'][0][0], this._data['coordinates'][0][1]);
			ctx2.lineTo(x, y);
			ctx2.stroke();
			ctx2.beginPath();
		}
	}

	onPointerUp(x, y, ctx) {
		this._drawing = false;
		this._data['type'] = 'line';
		this._data['coordinates'].push([ x, y ]);
		this.draw(this._data, ctx);
		this.sendDate(ctx);
	}

	onPointerDown(x, y, ctx, ctx2) {
		this._data['color'] = ctx2.strokeStyle;
		this._data['width'] = ctx2.lineWidth;
		this._data['coordinates'] = [ [ x, y ] ];
		this._drawing = true;
	}

	draw(data, ctx) {
		ctx.beginPath();
		ctx.strokeStyle = data['color'];
		ctx.lineWidth = data['width'];
		ctx.moveTo(data['coordinates'][0][0], data['coordinates'][0][1]);
		ctx.lineTo(data['coordinates'][1][0], data['coordinates'][1][1]);
		ctx.stroke();
		ctx.closePath();
	}
}
