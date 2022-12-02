import { ToolsUI } from './ToolsUI.js';
import { ToolsFactory } from './ToolsFactory.js';

export class CanvasUI {
	constructor(container, width, height) {
		this.currentTool = null;
		this._ctx1 = undefined;
		this._ctx2 = undefined;
		this._width = width;
		this._height = height;
		this._history = [];
		this._localHistory = [];
		const canv = this.creteCanvas(width, height);
		ToolsUI.attachToContainer(container, canv);
		this.downloadData();
	}

	creteCanvas(width, height) {
		const canvas = document.createElement('canvas');
		canvas.className = 'canvas-alfa';
		const canvasLayer2 = document.createElement('canvas');
		const canvasDiv = document.createElement('div');
		canvasDiv.appendChild(canvasLayer2);
		canvasDiv.appendChild(canvas);
		canvasDiv.className = 'canvas-wraper';
		canvasDiv.setAttribute('style', `width:${width}px; height:${height}px`);
		this._ctx1 = canvas.getContext('2d');
		this._ctx2 = canvasLayer2.getContext('2d');
		this._ctx2.setLineDash([ 5, 3 ]);
		canvas.width = width;
		canvas.height = height;
		canvasLayer2.width = width;
		canvasLayer2.height = height;

		canvas.addEventListener('mousemove', (e) => {
			if (this.currentTool) {
				this.currentTool.onPointerMove(e.offsetX, e.offsetY, this._ctx1, this._ctx2, width, height);
			}
		});

		canvas.addEventListener('mousedown', (e) => {
			console.log(e);
			if (this.currentTool) {
				this.currentTool.onPointerDown(e.offsetX, e.offsetY, this._ctx1, this._ctx2, width, height);
			}
		});

		canvas.addEventListener('mouseup', (e) => {
			if (this.currentTool) {
				this.currentTool.onPointerUp(e.offsetX, e.offsetY, this._ctx1, this._ctx2, width, height);
			}
		});

		canvas.addEventListener('touchstart', (e) => {
			e.preventDefault;
			e.stopPropagation;
			if (this.currentTool) {
				this.currentTool.onPointerDown(
					e.changedTouches[0]['pageX'],
					e.changedTouches[0]['pageY'],
					this._ctx1,
					this._ctx2,
					width,
					height
				);
			}
		});

		canvas.addEventListener('touchmove', (e) => {
			e.preventDefault;
			e.stopPropagation;
			if (this.currentTool) {
				this.currentTool.onPointerMove(
					e.changedTouches[0]['pageX'],
					e.changedTouches[0]['pageY'],
					this._ctx1,
					this._ctx2,
					width,
					height
				);
			}
		});

		canvas.addEventListener('touchend', (e) => {
			e.preventDefault;
			e.stopPropagation;
			if (this.currentTool) {
				this.currentTool.onPointerUp(
					e.changedTouches[0]['pageX'],
					e.changedTouches[0]['pageY'],
					this._ctx1,
					this._ctx2,
					width,
					height
				);
			}
		});

		this.intervalID = setInterval(this.downloadData.bind(this), 1000);

		return canvasDiv;
	}

	async sendData() {
		console.log(this._history);
		const json = JSON.stringify(this._history);
		fetch(`http://localhost/canvas/projects.php${window.location.search}`, {
			method: 'POST',
			body: json
		});
	}

	downloadData() {
		fetch(`http://localhost/canvas/projects.php/project.php${window.location.search}`)
			.then((response) => response.json())
			.then((json) => {
				this._ctx1.clearRect(0, 0, this._width, this._height);
				json = JSON.parse(json);
				this._history = json;
				const factory = new ToolsFactory();

				// prints all lines on canvas
				this._history.map((element) => {
					let scalex = this._width / element['windowWidth'];
					let scaley = this._height / element['windowHeight'];
					this._ctx1.scale(scalex, scaley);
					const tool = factory.getTool(element['type']);
					tool.draw(element, this._ctx1);

					// return canvass to preivious scale
					this._ctx1.scale(element['windowWidth'] / this._width, element['windowHeight'] / this._height);
				});
			});
	}

	changeTool(tool) {
		this.currentTool = tool;
	}

	changeColor(color) {
		this._ctx1.strokeStyle = color;
		this._ctx2.strokeStyle = color;
	}

	pushTohistory(obj) {
		this._history.push(obj);
		this._localHistory.push(obj);
		this.sendData();
	}

	changeWidth(width) {
		this._ctx1.lineWidth = width;
		this._ctx2.lineWidth = width;
	}

	undo() {
		let undoElement = this._localHistory.pop();
		this._history = this._history.filter((element) => {
			if (element['id'] != undoElement['id']) return element;
		});
		// after sendData refresh the page
		this.sendData().finally(() => this.refresh());
	}

	refresh() {
		this._ctx1.clearRect(0, 0, this._width, this._height);
		this.downloadData();
	}
}
