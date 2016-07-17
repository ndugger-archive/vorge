import { internal } from '../sys-state';

import update from './loop-update';
import render from './loop-render';

export default function loop () {

	if (internal.started) {
		return;
	}

	update();
	render();

	internal.started = true;
}
