import * as Common from '../common';
import * as State from '../state';

function update ( past = Date.now( ) ) {
	const now = Date.now( );
	const time = ( now - past ) / Common.timeSecond;

	State.internal.player.update( time );
	State.internal.map.update( time )
	State.internal.camera.update( );

	State.internal.frame = ( State.internal.frame + 1 ) % Common.fps;

	window.setTimeout( ( ) => update( now ), Common.timeSecond / Common.fps );
}

function render ( ) {
	const context = State.internal.canvas.getContext( '2d' );
	const { camera, canvas, map, player, renderer } = State.internal;

	context.fillRect( 0, 0, canvas.width, canvas.height );

	for ( let i = 0, count = map.layers.length; i < count; i++ ) {
		renderer.render( map.layers[ i ] );

		if ( i === map.playLayer ) {
			renderer.render( player.sprite );
		}
	}

	window.requestAnimationFrame( render );
}

export function start ( ) {

	if ( State.internal.started ) {
		return;
	}

	update( );
	render( );

	State.internal.started = true;
}
