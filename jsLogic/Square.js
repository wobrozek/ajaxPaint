import { Tool } from './Tool.js';

export class Square extends Tool {
	constructor() {
		super();
		this._drawing = false;
		this._start = [ 0, 0 ];
	}

	onPointerMove(x, y, ctx1, ctx2, ctxWidth, ctxHeight) {
		if (this._drawing) {
			ctx2.clearRect(0, 0, ctxWidth, ctxHeight);
			this.drawSquare(x, y, ctx2);
		}
	}

	onPointerUp(x, y, ctx) {
		this._drawing = false;
		this.drawSquare(x, y, ctx);
	}

	onPointerDown(x, y, ctx) {
		this._start = [ x, y ];
		this._drawing = true;
	}

	drawSquare(x, y, ctx) {
		x = this._start[0] - x;
		y = this._start[1] - y;
		ctx.rect(this._start[0], this._start[1], -x, -y);
		ctx.stroke();
		ctx.beginPath();
	}
}
