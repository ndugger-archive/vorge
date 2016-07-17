import { update as updateCamera } from '../../camera';
import { update as updateMap } from '../../map';
import { update as updatePlayer } from '../../entities/ent-player';

import { internal } from '../sys-state';
import { fps } from '../sys-common';

export default function updateLoop (past = Date.now()) {
	const now = Date.now();
	const time = (now - past) / 1000;

	updatePlayer(time);
	updateMap(time);
	updateCamera(time);

	internal.frame = (internal.frame + 1) % 60;

	window.setTimeout(() => updateLoop(now), fps);
}