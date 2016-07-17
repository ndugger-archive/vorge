import { internal } from '../system/sys-state';
import { moveTypes } from '../system/sys-common';

export function follow (target) {
	const { camera } = internal;

	camera.target = target;
}

export function update () {
	const { camera, canvas, map, settings } = internal;

	const isTileBased = settings.movement.type === moveTypes.tile;
	const notMovingX = camera.target.x === camera.target.destination.x;
	const notMovingY = camera.target.y === camera.target.destination.y;

	if (!camera.target.moving && (isTileBased && notMovingX && notMovingY)) {
		return;
	}
	
	const target = {
		x: Math.round(camera.target.x + (map.gridSize / 2) - (canvas.width / 2)),
		y: Math.round(camera.target.y + (map.gridSize / 2) - (canvas.height / 2))
	};

	// Set the proper X coordinate
	if (map.width < canvas.width) {
		camera.x = (map.width / 2) - (canvas.width / 2);
	}
	else if (target.x + canvas.width >= map.width) {
		camera.x = map.width - canvas.width;
	}
	else if (target.x <= 0) {
		camera.x = 0;
	}
	else {
		camera.x = target.x;
	}

	// Set the proper Y coordinate
	if (map.height < canvas.height) {
		camera.y = (map.height / 2) - (canvas.height / 2);
	}
	else if (target.y + canvas.height >= map.height) {
		camera.y = map.height - canvas.height;
	}
	else if (target.y <= 0) {
		camera.y = 0;
	}
	else {
		camera.y = target.y;
	}
}