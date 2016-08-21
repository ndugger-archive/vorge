export const keyboard = 'keyboard';
export const gamepad = 'gamepad';

export const timeSecond = 1000;
export const fps = 60;

export const compass = Object.freeze( {
	north: 'north',
	northEast: 'north-east',
	east: 'east',
	southEast: 'south-east',
	south: 'south',
	southWest: 'south-west',
	west: 'west',
	northWest: 'north-west'
} );

export const directions = Object.freeze( {
	up: 'up',
	right: 'right',
	down: 'down',
	left: 'left'
} );

export const alignment = Object.freeze( {
	right: 'right',
	left: 'left'
} );

export const moveTypes = Object.freeze( {
	grid: 'grid',
	pixel: 'pixel'
} );

export default Object.freeze( {
	compass,
	fps,
	moveTypes
} );