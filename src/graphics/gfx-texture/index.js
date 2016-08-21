import * as Util from '../../system/sys-util';
import Graphic from '../gfx-graphic';

export default class Texture extends Graphic {

	cached = true;
	loaded = false;
	
	data = new window.Image();

	constructor (src, x, y, clip = { }) {
		super(x, y);

		if (typeof src === 'object') {
			this.data = src;
			this.loaded = true;
		}
		else {
			this.src = src;
		}

		this.clip = clip;

		if (!('x' in clip)) {
	        this.clip.x = 0;
	    }

	    if (!('y' in clip)) {
	        this.clip.y = 0;
	    }
	}

	async load () {
		
		if (!this.loaded) {
			this.data = await Util.load(this.src);
			this.loaded = true;
		}

		return this;
	}
}