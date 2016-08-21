import * as State from '../../system/state';
import * as Util from '../../system/util';
import * as Common from '../../system/common';
import * as Graphics from '../../graphics';

import Entity from '../entity';

export default class Character extends Entity {

	loaded = false;

	dir = Object( { prev: null, next: Common.compass.south } );
	destination = Object( { x: this.x, y: this.y } );
	moving = false;

	sprite = new Graphics.Texture( );
	attributes = Array( );

	get isGridBasedMovement ( ) {
		return State.internal.settings.movement.type === Common.moveTypes.grid;
	}

	get isBetweenTiles ( ) {
		const { x, y, destination, dir } = this;

		switch ( true ) {

			case dir.next === Common.compass.north:
				return y > destination.y;

			case dir.next === Common.compass.east:
				return x < destination.x;

			case dir.next === Common.compass.south:
				return y < destination.y;

			case dir.next === Common.compass.west:
				return x > destination.x;
		}
	}

	async load ( ) {
		const { width, height, spritesheet, name, attributes = [ ] } = this.properties;

		this.sprite = new Graphics.Texture( spritesheet, this.x, this.y, { w: width, h: height } );
		await this.sprite.load( );

		this.loaded = true;

		return this;
	}

	findNextTile ( ) {
		const { map } = State.internal;
		const { gridSize } = map.data.properties;
		const dir = this.dir.next;
		const nextTile = { ...this.destination };

		switch ( true ) {

			case dir === Common.compass.north:
				nextTile.y = ( ( ( this.y | 0 ) - ( ( this.y | 0 ) % gridSize ) + 0.5 ) | 0 ); break;

			case dir === Common.compass.east:
				nextTile.x = ( ( ( this.x | 0 ) + ( gridSize - ( ( this.x | 0 ) % gridSize ) ) + 0.5 ) | 0 ); break;

			case dir === Common.compass.south:
				nextTile.y = ( ( ( this.y | 0 ) + ( gridSize - ( ( this.y | 0 ) % gridSize ) ) + 0.5 ) | 0 ); break;

			case dir === Common.compass.west:
				nextTile.x = ( ( ( this.x | 0 ) - ( ( this.x | 0 ) % gridSize ) + 0.5 ) | 0 ); break;
		}

		return nextTile;
	}

	update ( time ) {
		const { camera, map, settings, frame } = State.internal;
		const { gridSize } = map.data.properties;
		const { speed = 3, width, height } = this.properties;

		if ( this.moving && this.isGridBasedMovement ) {
			this.destination = this.findNextTile( );
		}

		if ( !this.moving && !this.isBetweenTiles && this.isGridBasedMovement ) {
			this.x = this.destination.x;
			this.y = this.destination.y;
		}

		if ( this.moving || ( this.isBetweenTiles && this.isGridBasedMovement ) ) {
			const walkSpeed = speed * gridSize;
			const somethingSomethingDynamicWalkingFrameBasedOnNumberOfFrames = false;
			const walkDestination = walkSpeed * time;

			if ( somethingSomethingDynamicWalkingFrameBasedOnNumberOfFrames ) { // TODO
				this.sprite.clip.x = ( this.sprite.clip.x + width ) % this.sprite.data.width;
			}

			switch ( true ) {

				case this.dir.next === Common.compass.north:
					this.sprite.clip.y = height * 3;
					this.y -= walkDestination; break;

				case this.dir.next === Common.compass.east:
					this.sprite.clip.y = height * 2;
					this.x += walkDestination; break;

				case this.dir.next === Common.compass.south:
					this.sprite.clip.y = 0;
					this.y += walkDestination; break;

				case this.dir.next === Common.compass.west:
					this.sprite.clip.y = height;
					this.x -= walkDestination; break;
			}
		}
		else {
			this.sprite.clip.x = 0;
		}

		this.sprite.x = this.x - ( width / 2 ) + ( gridSize / 2 ) - camera.x;
		this.sprite.y = this.y - height + gridSize - camera.y;
	}
}