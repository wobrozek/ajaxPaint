import { Tool } from './Tool.js';

export class Square extends Tool {
	constructor() {
		super();
	}

	onPointerMove(x, y, ctx1, ctx2, ctxWidth, ctxHeight) {
		if (this._drawing) {
			ctx2.clearRect(0, 0, ctxWidth, ctxHeight);

			x = this._data['coordinates'][0][0] - x;
			y = this._data['coordinates'][0][1] - y;
			ctx2.rect(this._data['coordinates'][0][0], this._data['coordinates'][0][1], -x, -y);
			ctx2.stroke();
			ctx2.beginPath();
		}
	}

	onPointerUp(x, y, ctx, ctx2, widht, height) {
		this._data['type'] = 'square';

		// second parametr is hight and widht of rectangle
		x = -(this._data['coordinates'][0][0] - x);
		y = -(this._data['coordinates'][0][1] - y);

		this._data['coordinates'].push([ x, y ]);
		super.onPointerUp(x, y, ctx, ctx2, widht, height);
	}

	draw(data, ctx) {
		ctx.beginPath();
		ctx.strokeStyle = data['color'];
		ctx.lineWidth = data['width'];
		ctx.rect(
			data['coordinates'][0][0],
			data['coordinates'][0][1],
			data['coordinates'][1][0],
			data['coordinates'][1][1]
		);
		ctx.stroke();

		ctx.closePath();
	}
}
