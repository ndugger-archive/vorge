export default class Graphic {

	x = 0;
	y = 0;

	cached = false;
	data = new window.Image();

	get width () {
		return this.data.width;
	}

	get height () {
		return this.data.height;
	}

	constructor ( x = 0, y = 0 ) {
		this.x = x;
		this.y = y;
	}

	cache () { }
}