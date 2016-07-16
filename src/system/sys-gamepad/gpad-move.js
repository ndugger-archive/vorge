import { compass, moveTypes } from '../sys-common';
import { internal } from '../sys-state';

const FPS = 1000 / 60;

function calculateDestination (dir) {
	const { player, map } = internal;
	const { gridSize } = map;

	if (dir === compass.north) {
		const y = Math.floor(player.y);
		player.destination.y = Math.round(y - (y % gridSize));
	}

	if (dir === compass.east) {
		const x = Math.ceil(player.x);
		player.destination.x = Math.round(x + (gridSize - (x % gridSize)));
	}

	if (dir === compass.south) {
		const y = Math.ceil(player.y);
		player.destination.y = Math.round(y + (gridSize - (y % gridSize)));
	}

	if (dir === compass.west) {
		const x = Math.floor(player.x);
		player.destination.x = Math.round(x - (x % gridSize));
	}
}

async function waitForPosition (dir) {
	const { player } = internal;
	const { destination } = player;

	let shouldWaitAgain;

	if (dir === compass.north) {
		shouldWaitAgain = player.y >= destination.y;
	}

	if (dir === compass.east) {
		shouldWaitAgain = player.x <= destination.x;
	}

	if (dir === compass.south) {
		shouldWaitAgain = player.y <= destination.y;
	}

	if (dir === compass.west) {
		shouldWaitAgain = player.x >= destination.x;
	}

	if (shouldWaitAgain) {
		return new Promise(resolve => 
			window.setTimeout(() => resolve(waitForPosition(dir)), FPS)
		);
	}
}

async function equalizePosition (dir) {
	const { player } = internal;

	calculateDestination(dir);
	await waitForPosition(dir);

	if (player.dir.next !== dir) {
		return;
	}

	console.log(player.x, player.destination.x)

	if (player.destination.x && (dir === compass.east || dir === compass.west)) {
		player.x = player.destination.x;
	}

	if (player.destination.y && (dir === compass.north || dir === compass.south)) {
		player.y = player.destination.y;
	}
}

export default async function move (dir = compass.south, keydown = false) {
	const { player, settings } = internal;
	const { movement } = settings;

	if (keydown) {

		if (player.moving) {

			if (player.dir.next === dir) {
				return;
			}

			if (movement.type === moveTypes.tile) {
				await equalizePosition(player.dir.next);
			}

			player.dir.prev = player.dir.next;
		}

		player.dir.next = dir;
		player.moving = true;
	}
	else {

		if (player.dir.prev) {

			if (player.dir.prev !== dir) {

				if (movement.type === moveTypes.tile) {
					await equalizePosition(player.dir.next);
				}

				player.dir.next = player.dir.prev;
			}

			player.dir.prev = null;
		}
		else {
			
			if (movement.type === moveTypes.tile) {
				await equalizePosition(dir);
			}

			player.moving = false;
		}
	}
} 