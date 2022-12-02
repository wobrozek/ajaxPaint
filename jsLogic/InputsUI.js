import { ToolsUI } from './ToolsUI.js';
import { undo } from '../script.js';
export class InputsUI {
	constructor(container) {
		const wraper = ToolsUI.createWraper();
		this.createInputs(wraper);
		ToolsUI.attachToContainer(container, wraper);
		this.subscribersColor = [];
		this.subscribersWidth = [];
	}

	createInputs(wraper) {
		const inputColor = document.createElement('input');
		inputColor.type = 'color';

		inputColor.addEventListener('input', () => {
			this.subscribersColor.forEach((element) => element(inputColor.value));
		});

		const inputWidth = document.createElement('input');
		inputWidth.type = 'range';
		inputWidth.min = '1';
		inputWidth.max = '50';
		inputWidth.defaultValue = '5';

		inputWidth.addEventListener('input', () => {
			this.subscribersWidth.forEach((element) => element(inputWidth.value));
		});

		const undoButton = document.createElement('button');

		undoButton.addEventListener('click', undo);
		undoButton.textContent = 'undo';

		wraper.appendChild(inputColor);
		wraper.appendChild(inputWidth);
		wraper.appendChild(undoButton);
	}

	subscribeColor(subscribers) {
		this.subscribersColor.push(subscribers);
	}

	subscribeWidth(subscribers) {
		this.subscribersWidth.push(subscribers);
	}
}
