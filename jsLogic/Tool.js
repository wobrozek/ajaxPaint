import { updateHistory } from '../script.js';

export class Tool {
	constructor() {
		if (this.constructor === Tool) {
			throw new Error('FYI: Instance of Abstract class cannot be instantiated');
		}

		this._data = {
			id: '',
			type: '',
			coordinates: [],
			color: '',
			width: ''
		};
	}

	sendDate(ctx) {
		this._data['id'] = Date.now() + Math.random();
		// copy object not reference
		let copy = { ...this._data };
		updateHistory(copy);

		// const xhr = new XMLHttpRequest();
		// xhr.open('POST', 'http://localhost/canvas/storage.php', true);
		// xhr.setRequestHeader('Content-type', 'application/json');
		// xhr.send(json);
	}
}
