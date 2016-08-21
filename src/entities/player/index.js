import * as State from '../../system/state';

import Character from '../character';

export default class Player extends Character {

	async use ( ) {

		if ( !this.loaded ) {
			await this.load( );
		}
		
		State.internal.player = this;
	}

	move ( dir, keydown ) {

		if ( keydown ) {

			if ( this.moving ) {

				if ( this.dir.next === dir ) {
					return;
				}

				this.dir.prev = this.dir.next;
			}

			this.dir.next = dir;
			this.moving = true;
		}
		else {

			if ( this.dir.prev ) {

				if ( this.dir.prev !== dir ) {

					this.dir.next = this.dir.prev;
				}

				this.dir.prev = null;
			}
			else {

				this.moving = false;
			}
		}
	}
}