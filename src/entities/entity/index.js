export default class Entity {

	constructor (x = 0, y = 0, properties = { width: 1, height: 1 }) {
		this.x = x;
		this.y = y;
		this.properties = properties;

		if (!('width' in this.properties)) {
			this.properties.width = 1;
		}

		if (!('height' in this.properties)) {
			this.properties.height = 1;
		}
	}

	async load () { }

	update () { }

	render () { }
}
