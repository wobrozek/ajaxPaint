import { Tool } from './Tool.js';

export class Pencil extends Tool {
	constructor() {
		super();
	}

	onPointerMove(x, y, ctx1, ctx2) {
		if (this._drawing) {
			ctx2.lineTo(x, y);
			ctx2.stroke();
			this._data['coordinates'].push([ x, y ]);
		}
	}

	onPointerUp(x, y, ctx1, ctx2) {
		this._drawing = false;
		this._data['type'] = 'pencil';
		ctx2.beginPath();
		this.sendDate();
	}

	draw(data, ctx) {
		ctx.beginPath();
		ctx.strokeStyle = data['color'];
		ctx.lineWidth = data['width'];

		data['coordinates'].map((xytab) => {
			ctx.lineTo(xytab[0], xytab[1]);
		});

		ctx.stroke();
		ctx.closePath();
	}
}
