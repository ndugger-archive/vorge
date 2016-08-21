import 'babel-polyfill';

export * as System from './system';
export * as Graphics from './graphics';
export * as Entities from './entities';

export Scripts from './scripts';
export TileMap from './tilemap';

// ======================================================

// Temp TEST code:
(() => {

	const Vorge = exports;

	const testMap = {
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
	};

	Vorge.System.main(document.getElementById('vorgeContainer'));

	const map = new Vorge.TileMap(testMap);
	map.load().then(map => map.use());

	const player = new Vorge.Entities.Player(128, 128, { width: 32, height: 48, spritesheet: 'sprite-xp.png' });
	player.load().then(player => {
		player.use();
		Vorge.System.state.camera.follow(player);
	});

	window.Vorge = Vorge;

})();
