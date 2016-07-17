export const compass = Object.freeze({
	north: 'north',
	east: 'east',
	south: 'south',
	west: 'west'
});

export const fps = 1000 / 60;

export const moveTypes = Object.freeze({
	tile: 'tile',
	pixel: 'pixel'
});

export default Object.freeze({
	compass,
	fps,
	moveTypes
})