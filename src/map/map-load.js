import load from '../system/sys-load';
import layer from './map-layer';

function isTiledMap (data) {
	// TODO check for tiled "schema"
	return false;
}

function convertMapFromTiled (data) {
	// TODO do stuff, duh
}

export default async function loadMap (data) {
	if (isTiledMap(data)) {
		data = convertMapFromTiled(data);
	}
	
	const { layers, events, blocks } = data;
	const { width, height, gridSize, eventLayer } = data.properties;

	const playLayer = layers.indexOf(layers.find(layer => layer.name === eventLayer));

	const tileset = await load(data.properties.tileset);
	const tileLayers = layers.map(({ tiles }) => layer(width, height, tileset, gridSize, tiles));

	//const autoTilesets = await Promise.all(data.properties.autoTilesets.map(load));
	//const autoTileLayers = layers.map(({ autoTiles }) => autotiles(autoTilesets, autoTiles));

	const loaded = true;

	return { 
		loaded, 
		gridSize, 
		tileLayers, 
		//autoTileLayers, 
		//events, 
		blocks, 
		playLayer,
		width,
		height
	};
}
