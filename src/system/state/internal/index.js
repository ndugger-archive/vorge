import * as Defaults from '../defaults';

export default Object.seal( {

	canvas: document.createElement( 'canvas' ),

	camera: Defaults.camera,
	frame: 0,
	map: Defaults.map,
	menu: null,
	paused: false,
	player: Defaults.player,
	controller: null,
	renderer: Defaults.renderer,
	settings: Defaults.settings,
	ui: { },

	ext: { },

	started: false,
	killed: false
	
} );