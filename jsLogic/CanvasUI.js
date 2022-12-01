import { ToolsUI } from './ToolsUI.js';
import { ToolsFactory } from './ToolsFactory.js';

export class CanvasUI {
	constructor(container, width, height) {
		this.currentTool = null;
		this._ctx1 = undefined;
		this._ctx2 = undefined;
		this._width = width;
		this._height = height;
		this.history = [];
		const canv = this.creteCanvas(width, height);
		ToolsUI.attachToContainer(container, canv);
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
				this.currentTool.onPointerUp(e.offsetX, e.offsetY, this._ctx1, this._ctx2);
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
					this._ctx2
				);
			}
		});

		this.intervalID = setInterval(this.downloadData.bind(this), 1000);

		return canvasDiv;
	}

	sendData() {
		console.log(this.history);
		const json = JSON.stringify(this.history);
		fetch(`http://localhost/canvas/projects.php${window.location.search}`, {
			method: 'POST',
			body: json
		});
	}

	downloadData() {
		fetch(`http://localhost/canvas/projects.php/project.php${window.location.search}`)
			.then((response) => response.json())
			.then((json) => {
				json = JSON.parse(json);
				this.history = json;
				const factory = new ToolsFactory();

				// prints all lines on canvas
				this.history.map((element) => {
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
		this.history.push(obj);
		this.sendData();
	}

	changeWidth(width) {
		this._ctx1.lineWidth = width;
		this._ctx2.lineWidth = width;
	}
}
