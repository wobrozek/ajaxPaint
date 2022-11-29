import { Tool } from './Tool.js';

export class Circle extends Tool {
	constructor() {
		super();
		this._drawing = false;
		this._start = [ 0, 0 ];
	}

	onPointerMove(x, y, ctx1, ctx2, width, height) {
		if (this._drawing) {
			ctx2.clearRect(0, 0, width, height);
			this.drawCircle(x, y, ctx2);
		}
	}

	onPointerUp(x, y, ctx) {
		this._drawing = false;
		this.drawCircle(x, y, ctx);
	}

	onPointerDown(x, y, ctx) {
		this._start = [ x, y ];
		this._drawing = true;
	}

	drawCircle(x, y, ctx) {
		var distance = Math.sqrt(Math.pow(this._start[0] - x, 2) + Math.pow(this._start[1] - y, 2), 2);
		ctx.arc(this._start[0], this._start[1], distance, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.beginPath();
	}
}
