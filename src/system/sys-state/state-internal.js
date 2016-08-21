import * as Defaults from './state-defaults';

import Camera from '../../camera';
import Character from '../../entities/ent-character';
import TileMap from '../../tilemap';
import Renderer2D from '../../renderer-2d';

export default Object.seal( {

	camera: new Camera( 0, 0 ),
	canvas: document.createElement( 'canvas' ),
	frame: 0,
	map: new TileMap( { properties: { gridSize: 0 } } ),
	menu: null,
	paused: false,
	player: new Character( ),
	controller: null,
	renderer: new Renderer2D( ),
	settings: Defaults.settings,
	ui: { },

	ext: { },

	started: false,
	killed: false
	
} );