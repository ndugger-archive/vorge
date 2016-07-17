import { compass, fps, moveTypes } from '../sys-common';
import { internal } from '../sys-state';

export default async function move (dir = compass.south, keydown = false) {
	const { player, settings } = internal;
	const { movement } = settings;

	if (keydown) {

		if (player.moving) {

			if (player.dir.next === dir) {
				return;
			}

			player.dir.prev = player.dir.next;
		}

		player.dir.next = dir;
		player.moving = true;
	}
	else {

		if (player.dir.prev) {

			if (player.dir.prev !== dir) {

				player.dir.next = player.dir.prev;
			}

			player.dir.prev = null;
		}
		else {

			player.moving = false;
		}
	}
} 