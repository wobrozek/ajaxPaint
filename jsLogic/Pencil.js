import { Tool } from './Tool.js';

export class Pencil extends Tool {
	constructor() {
		super();
		this._drawing = false;
	}

	onPointerMove(x, y, ctx1, ctx2) {
		if (this._drawing) {
			ctx1.lineCap = 'round';
			ctx1.lineTo(x, y);
			ctx1.stroke();
		}
	}

	onPointerUp(x, y, ctx1, ctx2) {
		this._drawing = false;
		ctx1.beginPath();
		ctx2.beginPath();
	}

	onPointerDown() {
		this._drawing = true;
	}
}
