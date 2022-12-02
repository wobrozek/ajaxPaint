import { updateHistory } from '../script.js';

export class Tool {
	constructor() {
		if (this.constructor === Tool) {
			throw new Error('FYI: Instance of Abstract class cannot be instantiated');
		}
		this._drawing = false;
		this._data = {
			id: '',
			type: '',
			coordinates: [],
			color: '',
			width: '',
			windowWidth: '',
			windowHeight: ''
		};
	}

	sendDate() {
		console.log(this);
		this._data['id'] = Date.now() + Math.random();
		// copy object not reference
		let copy = { ...this._data };
		updateHistory(copy);

		// const xhr = new XMLHttpRequest();
		// xhr.open('POST', 'http://localhost/canvas/storage.php', true);
		// xhr.setRequestHeader('Content-type', 'application/json');
		// xhr.send(json);
	}

	onPointerUp(x, y, ctx, ctx2, width, height) {
		ctx2.clearRect(0, 0, width, height);
		this._drawing = false;
		this.draw(this._data, ctx);
		this.sendDate();
	}

	onPointerDown(x, y, ctx, ctx2, width, height) {
		this._data['color'] = ctx2.strokeStyle;
		this._data['width'] = ctx2.lineWidth;
		this._data['coordinates'] = [ [ x, y ] ];
		this._data['windowWidth'] = width;
		this._data['windowHeight'] = height;
		this._drawing = true;
	}
}
