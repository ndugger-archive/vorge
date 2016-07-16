import 'babel-polyfill';

import ascii from '../ascii';

import * as system from './system';

export * as entities from './entities';
export * as map from './map';

export { system };

export function main (container = document.body) {
	const { state } = system;
	
	state.canvas.width = container.offsetWidth;
	state.canvas.height = container.offsetHeight;

	while (container.firstChild) container.firstChild.remove();

	container.appendChild(state.canvas);

	system.loop();

	console.log('\n' + ascii + '\n\n\n');
}









// Temp TEST code:
(() => {


	const vorge = exports; // import * as vorge from 'vorge';

	vorge.main(document.getElementById('vorgeContainer'));

	vorge.map.load({
		layers: [
			{
				name: 'ground',
				tiles: (() => {
					const tiles = [];

					let alt = true;
					for (let x = 0; x < 960; x += 32) {
						for (let y = 0; y < 960; y += 32) {
							tiles.push({ 
								x, y, src: { x: alt ? 32 : 192, y: alt ? 128 : 224 }
							});
							alt = !alt;
						}
						alt = !alt;
					}

					return tiles;
				})()
			}
		],
		properties: {
			width: 960,
			height: 960,
			gridSize: 32,
			tileset: 'tileset.png',
			eventLayer: 'ground'
		}
	}).then(vorge.map.use);

	vorge.entities.player.load({
		x: 128,
		y: 128,
		properties: {
			width: 560 / 8,
			height: 280 / 4,
			spritesheet: 'sprite.png'
		}
	}).then(player => {
		vorge.entities.player.use(player);
		vorge.system.camera.follow(player);
	})
	
	const moveKeys = [
		{ dir: 'north', code: 87 },
		{ dir: 'east', code: 68 },
		{ dir: 'south', code: 83 },
		{ dir: 'west', code: 65 }
	];

	window.addEventListener('keydown', e => {
		const { keyCode } = e;

		if (moveKeys.some(key => key.code === keyCode)) {
			const key = moveKeys.find(key => key.code === keyCode);

			vorge.system.gamepad.move(key.dir, true);
		}
	});

	window.addEventListener('keyup', e => {
		const { keyCode } = e;

		if (moveKeys.some(key => key.code === keyCode)) {
			const key = moveKeys.find(key => key.code === keyCode);

			vorge.system.gamepad.move(key.dir, false);
		}
	});



	window.vorge = vorge;


})();
