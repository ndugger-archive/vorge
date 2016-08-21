import Camera from '../../../camera';
import Character from '../../../entities/character';
import TileMap from '../../../tilemap';
import Renderer2D from '../../../renderer2d';

export const camera = new Camera( 0, 0 );
export const map = new TileMap( { properties: { gridSize: 0 } } );
export const player = new Character( );
export const renderer = new Renderer2D( );

export const settings = Object.seal ( {
	players: 'multi',
	movement: {
		type: 'grid',
		dirs: 4
	},
	controller: 'keyboard',
	controls: {
		up: 'w',
		right: 'd',
		down: 's',
		left: 'a'
	}
} );