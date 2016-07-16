import { internal } from '../../system/sys-state';
import { compass } from '../../system/sys-common';

const N = 4; // N === number of tiles per second;

export default function updatePlayer (time) {
	const { player, map } = internal;
	const { gridSize } = map;
	const { speed = gridSize * N } = player;
	const next = speed * time;

	if (player.moving) {

		if (internal.frame % Math.round(60 / ((speed * 2.5) / gridSize)) === 0) {
			player.sprite.clip.x = (player.sprite.clip.x + player.width) % player.sprite.data.width;
		}

		if (player.dir.next === compass.north) {
			player.sprite.clip.y = player.height * 3;
			player.y -= next;
		}

		if (player.dir.next === compass.east) {
			player.sprite.clip.y = player.height * 2;
			player.x += next;
		}

		if (player.dir.next === compass.south) {
			player.sprite.clip.y = 0;
			player.y += next;
		}

		if (player.dir.next === compass.west) {
			player.sprite.clip.y = player.height;
			player.x -= next;
		}
	}
	else {
		player.sprite.clip.x = 0;
		player.destination.x = null;
		player.destination.y = null;
	}

	player.sprite.x = player.x - (player.width / 2) + (gridSize / 2) - internal.camera.x;
	player.sprite.y = player.y - player.height + gridSize - internal.camera.y;
}
