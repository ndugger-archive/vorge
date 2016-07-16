import { image } from '../graphics';

export default function layer (width, height, tileset, gridSize, tiles) {
	const cachedLayer = document.createElement('canvas');
	const ctx = cachedLayer.getContext('2d');

	cachedLayer.width = width;
	cachedLayer.height = height;

	tiles.forEach(tile => ctx.drawImage(
		tileset,
		tile.src.x, tile.src.y, gridSize, gridSize,
		tile.x, tile.y, gridSize, gridSize
	));

	return image({ data: cachedLayer });
}