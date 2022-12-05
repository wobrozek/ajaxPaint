import { undo } from '../script.js';

export class ToolsUI {
	constructor(container) {
		const wraper = ToolsUI.createWraper();
		this.createButtons(wraper);
		ToolsUI.attachToContainer(container, wraper);
		this.creteUndoButton(wraper);
		this.subscribers = [];
	}

	static createWraper() {
		const wraper = document.createElement('div');
		wraper.classList.add('flex');
		return wraper;
	}

	createButtons(wraper) {
		wraper.appendChild(this.createButton('✏', 'pencil'));
		wraper.appendChild(this.createButton('📏', 'line'));
		wraper.appendChild(this.createButton('⬜', 'square'));
		wraper.appendChild(this.createButton('⚪', 'circle'));
	}

	static attachToContainer(container, wraper) {
		document.querySelector(container).appendChild(wraper);
	}

	createButton(tool, selector) {
		const btn = document.createElement('button');
		btn.innerText = tool;
		btn.classList.add('btn-tool', 'btn');
		btn.setAttribute('data-tool', selector);

		// inform subscribers about clicking a button
		btn.addEventListener('click', () => {
			this.subscribers.forEach((element) => element(selector));
		});

		return btn;
	}
	// fa-solid fa-rotate-left
	creteUndoButton(wraper) {
		const undoButton = document.createElement('button');
		wraper.appendChild(undoButton);

		undoButton.classList.add('btn-tool', 'btn');
		undoButton.addEventListener('click', undo);
		undoButton.textContent = '↩';
	}

	subscribe(subscribers) {
		this.subscribers.push(subscribers);
	}
}
