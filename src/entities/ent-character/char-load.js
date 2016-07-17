import load from '../../system/sys-load';
import { image } from '../../graphics';

export default async function loadCharacter ({ x, y, properties }) {
	const { width, height, spritesheet } = properties;

	const dir = { prev: null, next: 'south' };
	const moving = false;
	const destination = { x, y };

	const sprite = image({ 
		x,
		y,
		data: await load(spritesheet),
		clip: { w: width, h: height }
	});

	return {
		x,
		y,
		width,
		height,
		dir,
		moving,
		destination,
		sprite
	}
}