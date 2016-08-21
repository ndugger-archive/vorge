import * as State from '../system/sys-state';
import * as Util from '../system/sys-util';
import * as Graphics from '../graphics';

function convertDataFromTiledEditor (data) {
	// do stuff
}

export default class TileMap {

	loaded = false;
	layers = [ ];
	playLayer = 0;

	get isTiledEditorMap ( ) {
		return false;
	}

	constructor ( data ) {
		this.data = data;
	}

	cacheLayer ( tileset, layer ) {
		const { width, height, gridSize } = this.data.properties;
		const cachedLayer = document.createElement( 'canvas' );
		const ctx = cachedLayer.getContext( '2d' );

		cachedLayer.width = width;
		cachedLayer.height = height;

		for ( let i = 0, count = layer.tiles.length; i < count; i++ ) {
			const tile = layer.tiles[ i ];

			ctx.drawImage( tileset,
				tile.src.x, tile.src.y, gridSize, gridSize,
				tile.x, tile.y, gridSize, gridSize );
		}

		return new Graphics.Texture( cachedLayer );
	}

	async load ( ) {

		if ( this.isTiledEditorMap ) {
			this.data = convertDataFromTiledEditor( this.data );
		}

		const { layers, events, blocks, properties } = this.data;
		const { width, height, gridSize, eventLayer } = properties;

		const playLayer = layers.indexOf( layers.find( x => x.name === eventLayer ) );

		const tileset = await Util.load( properties.tileset );
		const tileLayers = layers.map( layer => this.cacheLayer( tileset, layer ) );

		this.playLayer = playLayer;
		this.layers = tileLayers;
		this.loaded = true;

		return this;
	}

	async use ( ) {

		if ( !this.loaded ) {
			await this.load( );
		}

		State.internal.map = this;
	}

	update ( time ) {
		const { camera, canvas } = State.internal;

		for ( let i = 0, count = this.layers.length; i < count; i++ ) {

			this.layers[ i ].clip = {
				x: camera.x,
				y: camera.y,
				w: canvas.width,
				h: canvas.height
			};
		}
	}
}