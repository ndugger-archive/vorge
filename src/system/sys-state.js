import { image } from '../graphics';

const EMPTY_CAMERA = {
	x: 0,
	y: 0,
	target: { 
		x: 0, y: 0, width: 0, height: 0 
	}
};

const EMPTY_MAP = { tileLayers: [], playLayer: 0 };

const EMPTY_PLAYER = {
	width: 32,
	height: 32,
	x: 256,
	y: 256,
	dir: { prev: null, next: 'south' },
	destination: { x: null, y: null },
	moving: false,
	sprite: image({ data: new Image() })
};

const DEFAULT_SETTINGS = {
	movement: {
		type: 'pixel',
		dirs: 4
	}
};

export const internal = {
	camera: EMPTY_CAMERA,
	canvas : document.createElement('canvas'),
	frame: 0,
	map: EMPTY_MAP,
	paused: false,
	player: EMPTY_PLAYER,
	running: false,
	settings: DEFAULT_SETTINGS,

	ext: {},
};

export default Object.seal({

	get width () { return internal.canvas.width },
	get height () { return internal.canvas.height },
	get canvas () { return internal.canvas },
	get container () { return internal.canvas.parentNode },

	get map () { return internal.map },

	get player () { return internal.player },

	get paused () { return internal.paused },
	get running () { return internal.running },

	get ext () { return internal.ext }

});
