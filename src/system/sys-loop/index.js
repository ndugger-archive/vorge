import state, { internal } from '../sys-state';

import update from './loop-update';
import render from './loop-render';

export default function loop () {
	if (internal.running) {
		return;
	}

	update();
	render();

	internal.running = true;
}
