import { render as renderMap } from '../../map';
import { render as renderPlayer } from '../../entities/ent-player';

import state, { internal } from '../sys-state';

export default function renderLoop () {
	const ctx = state.canvas.getContext('2d');
	const { player, camera } = internal;

	ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);

	renderMap();
	renderPlayer();

	window.requestAnimationFrame(renderLoop);
}