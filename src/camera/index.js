import * as State from '../system/state';
import * as Entities from '../entities';

export default class Camera {

	x = 0; 
	y = 0;

	target = new Entities.Entity( );

	constructor ( x = 0, y = 0 ) {
		this.x = x;
		this.y = y;
	}

	follow ( target ) {
		this.target = target;
	}

	update ( ) {
		const { canvas, map } = State.internal;
		const { gridSize } = map.data.properties;
		
		const x = ( this.target.x + ( gridSize / 2 ) - ( canvas.width / 2 ) + 0.5) | 0;
		const y = ( this.target.y + ( gridSize / 2 ) - ( canvas.height / 2 ) + 0.5) | 0;

		if ( map.data.properties.width < canvas.width ) {
			this.x = ( map.data.properties.width / 2 ) - ( canvas.width / 2 );
		}
		else if ( x + canvas.width >= map.data.properties.width ) {
			this.x = map.data.properties.width - canvas.width;
		}
		else if ( x <= 0 ) {
			this.x = 0;
		}
		else {
			this.x = x;
		}

		if ( map.data.properties.height < canvas.height ) {
			this.y = ( map.data.properties.height / 2 ) - ( canvas.height / 2 );
		}
		else if ( y + canvas.height >= map.data.properties.height ) {
			this.y = map.data.properties.height - canvas.height;
		}
		else if ( y <= 0 ) {
			this.y = 0;
		}
		else {
			this.y = y;
		}
	}
}