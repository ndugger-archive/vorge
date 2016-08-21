import * as State from '../system/state';
import * as Common from '../system/common';

import KeyCodes from './kb-keycodes';

export default class Keyboard {

	constructor ( ) {
		window.addEventListener( 'keydown', e => this.handleKey( e, true ) );
		window.addEventListener( 'keyup', e => this.handleKey( e, false ) );
	}

	handleKey ( event, keydown ) {
		const { controls } = State.internal.settings;

		for ( const control in controls ) {

			if ( event.keyCode === KeyCodes[ controls[ control ] ] ) {

				switch ( control ) {

					case Common.directions.up:
						return State.internal.player.move( Common.compass.north, keydown );

					case Common.directions.right:
						return State.internal.player.move( Common.compass.east, keydown );

					case Common.directions.down:
						return State.internal.player.move( Common.compass.south, keydown );

					case Common.directions.left:
						return State.internal.player.move( Common.compass.west, keydown );
				}
			}
		}
	}
}