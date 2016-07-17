import load from '../../system/sys-load';
import { image, text } from '../../graphics';

export default async function loadCharacter ({ x, y, properties }) {
	const { width, height, spritesheet, name, attributes = [] } = properties;

	const dir = { prev: null, next: 'south' };
	const moving = false;
	const destination = { x, y };

	const sprite = image({ 
		x,
		y,
		data: await load(spritesheet),
		clip: { w: width, h: height }
	});

	const label = text({
		content: name,
		x: x,
		y: y,
		style: {
			fill: 'yellow',
			stroke: {
				color: 'black',
				width: 1
			},
			font: {
				weight: 'bold',
				size: 12
			}
		}
	});

	return {

		x,
		y,

		width,
		height,

		dir,
		moving,
		destination,

		sprite,
		label,

		attributes

	}
}