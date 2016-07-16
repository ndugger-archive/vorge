import { internal } from '../system/sys-state';

export default function updateMap () {
	const { camera, canvas, map } = internal;
	const layerCount = map.tileLayers.length;

	for (let i = 0; i < layerCount; i++) {
		const layer = map.tileLayers[i];

		layer.clip = {
			x: camera.x,
			y: camera.y,
			w: canvas.width,
			h: canvas.height
		};
	}
}