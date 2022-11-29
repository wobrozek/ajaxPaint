export class ToolsUI {
	constructor(container) {
		const wraper = ToolsUI.createWraper();
		this.createButtons(wraper);
		ToolsUI.attachToContainer(container, wraper);
		this.subscribers = [];
	}

	static createWraper() {
		const wraper = document.createElement('div');
		wraper.classList.add('flex', 'flex-spaceAround');
		return wraper;
	}

	createButtons(wraper) {
		wraper.appendChild(this.createButton('Pencil', 'pencil'));
		wraper.appendChild(this.createButton('Line', 'line'));
		wraper.appendChild(this.createButton('Square', 'square'));
		wraper.appendChild(this.createButton('Circle', 'circle'));
	}

	static attachToContainer(container, wraper) {
		document.querySelector(container).appendChild(wraper);
	}

	createButton(name, selector) {
		const btn = document.createElement('button');
		btn.setAttribute('data-tool', selector);
		btn.textContent = name;

		// inform subscribers about clicking a button
		btn.addEventListener('click', () => {
			this.subscribers.forEach((element) => element(selector));
		});

		return btn;
	}

	subscribe(subscribers) {
		this.subscribers.push(subscribers);
	}
}
