import ascii from '../../../ascii';

import * as Loop from '../loop';
import * as State from '../state';
import * as Common from '../common';

import Keyboard from '../../keyboard';
import Gamepad from '../../gamepad';

export default function main ( container = document.body ) {
	console.log( '\n' + ascii + '\n\n\n' );

	State.internal.canvas.width = container.offsetWidth;
	State.internal.canvas.height = container.offsetHeight;

	while ( container.firstChild ) container.firstChild.remove( );
	container.appendChild( State.internal.canvas );

	if ( State.internal.settings.controller === Common.keyboard ) {
		State.internal.controller = new Keyboard( );
	}

	if ( State.internal.settings.controller === Common.gamepad ) {
		State.internal.controller = new Gamepad( );
	}

	Loop.start( );
}