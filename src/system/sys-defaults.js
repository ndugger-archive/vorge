import { image, text } from '../graphics';
import { compass, moveTypes } from './sys-common';

export const map = { tileLayers: [], playLayer: 0 };

export const player = {
	width: 32,
	height: 32,
	x: 256,
	y: 256,
	dir: { prev: null, next: 'south' },
	destination: { x: null, y: null },
	moving: false,
	sprite: image({ data: new Image() }),
	label: text()
};

export const camera = {
	x: 0,
	y: 0,
	target: player
};

export const settings = {
	movement: {
		type: 'tile',
		dirs: 4
	}
};