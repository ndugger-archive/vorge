import { internal } from '../system/sys-state';
import * as renderer from '../renderer';

export * as controls from './ui-controls';

export function render () {
	const { ui } = internal;
	const { controls } = ui;

	/*for (const control of controls) {
		renderer.render(control);
	}*/
}