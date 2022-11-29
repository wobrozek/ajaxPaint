import { Pencil } from './Pencil.js';
import { Circle } from './Circle.js';
import { Line } from './Line.js';
import { Square } from './Square.js';

export class ToolsFactory {
	constructor() {
		this.pencil = new Pencil();
		this.circle = new Circle();
		this.square = new Square();
		this.line = new Line();
	}

	getTool(tool) {
		switch (tool) {
			case 'pencil':
				return this.pencil;
			case 'circle':
				return this.circle;
			case 'line':
				return this.line;
			case 'square':
				return this.square;
		}
	}
}
