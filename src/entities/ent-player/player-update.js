import { internal } from '../../system/sys-state';
import { compass, moveTypes } from '../../system/sys-common';

function calculateNextTile (dir) {
	const { player, map } = internal;
	const { gridSize } = map;

	const tile = { ...player.destination };

	if (dir === compass.north) {
		const y = Math.floor(player.y);
		tile.y = Math.round(y - (y % gridSize));
	}

	if (dir === compass.east) {
		const x = Math.ceil(player.x);
		tile.x = Math.round(x + (gridSize - (x % gridSize)));
	}

	if (dir === compass.south) {
		const y = Math.ceil(player.y);
		tile.y = Math.round(y + (gridSize - (y % gridSize)));
	}

	if (dir === compass.west) {
		const x = Math.floor(player.x);
		tile.x = Math.round(x - (x % gridSize));
	}

	return tile;
}

function isBetweenTiles (dir) {
	const { player } = internal;
	const { x, y, destination } = player;

	if (player.dir.next === compass.north && y > destination.y) {
		return true;
	}

	if (player.dir.next === compass.east && x < destination.x) {
		return true;
	}

	if (player.dir.next === compass.south && y < destination.y) {
		return true;
	}

	if (player.dir.next === compass.west && x > destination.x) {
		return true;
	}

	return false;
}

const N = 4; // N === number of tiles per second;

export default function updatePlayer (time) {
	const { player, map, settings } = internal;
	const { gridSize } = map;
	const { speed = gridSize * N } = player;
	const next = speed * time;

	const isTileBased = settings.movement.type === moveTypes.tile;

	if (player.moving && isTileBased) {
		player.destination = calculateNextTile(player.dir.next);
	}

	const shouldKeepMoving = isBetweenTiles(player.dir.next);

	if (!player.moving && !shouldKeepMoving && isTileBased) {
		player.x = player.destination.x;
		player.y = player.destination.y;
	}

	if (player.moving || (shouldKeepMoving && isTileBased)) {

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
	}

	player.sprite.x = player.x - (player.width / 2) + (gridSize / 2) - internal.camera.x;
	player.sprite.y = player.y - player.height + gridSize - internal.camera.y;
}
