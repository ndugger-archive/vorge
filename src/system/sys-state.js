import * as defaults from './sys-defaults';

export const internal = Object.seal({
	camera: defaults.camera,
	canvas : document.createElement('canvas'),
	frame: 0,
	map: defaults.map,
	paused: false,
	player: defaults.player,
	running: false,
	settings: defaults.settings,

	ext: {},
});

export default Object.freeze({

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
