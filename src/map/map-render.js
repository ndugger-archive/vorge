import { internal } from '../system/sys-state';
import * as renderer from '../renderer';

export default function renderMap () {
	const { map } = internal;
	const layerCount = map.tileLayers.length

	for (let i = 0; i < layerCount; i++) {
		renderer.render(map.tileLayers[i]);

		if (i === map.playLayer) {
			// render events and player
		}
	}
}