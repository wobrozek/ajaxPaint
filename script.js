import { ToolsFactory } from './jsLogic/ToolsFactory.js';
import { CanvasUI } from './jsLogic/CanvasUI.js';
import { ToolsUI } from './jsLogic/ToolsUI.js';
import { InputsUI } from './jsLogic/InputsUI.js';

const factory = new ToolsFactory();
const tools = new ToolsUI('.js-tools');
const inputs = new InputsUI('.js-inputs');
const canvas = new CanvasUI('.js-canvas', window.innerWidth, window.innerHeight / 2);

tools.subscribe((selectedTool) => {
	const tool = factory.getTool(selectedTool);
	canvas.changeTool(tool);
});

inputs.subscribeColor((color) => {
	canvas.changeColor(color);
});

inputs.subscribeWidth((width) => {
	canvas.changeWidth(width);
});

export function updateHistory(history) {
	canvas.pushTohistory(history);
}
