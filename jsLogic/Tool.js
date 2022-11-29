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
			width: ''
		};
	}

	sendDate() {
		this._data['id'] = Date.now() + Math.random();
		// copy object not reference
		let copy = { ...this._data };
		updateHistory(copy);

		// const xhr = new XMLHttpRequest();
		// xhr.open('POST', 'http://localhost/canvas/storage.php', true);
		// xhr.setRequestHeader('Content-type', 'application/json');
		// xhr.send(json);
	}

	onPointerDown(x, y, ctx, ctx2) {
		this._data['color'] = ctx2.strokeStyle;
		this._data['width'] = ctx2.lineWidth;
		this._data['coordinates'] = [ [ x, y ] ];
		this._drawing = true;
	}
}
