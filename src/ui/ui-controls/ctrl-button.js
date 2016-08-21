import { alignment } from '../../system/sys-common';
import { text } from '../../graphics';

export default function button ({ content = 'button', x = 0, y = 0, width = 1, height = 1, align = alignment.left, style = { } }) {

	const buttonText = text({
		content,
		x: x + 32, y: y + 8,
		style: style.text
	});

	return {
		type: 'group',
		children: [
			{
				type: 'rectangle',
				x, y, width, height,
				style: {
					fill: style.fill,
					stroke: style.stroke
				}
			},
			buttonText
		]
	}
}
