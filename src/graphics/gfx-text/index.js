import Graphic from '../gfx-graphic';

export default class Text extends Graphic {

	content = null;
	style = null;

	data = document.createElement( 'canvas' );

	constructor ( content, x, y, style = { } ) {
		super( x, y );

		this.content = content;
		this.style = style;

		if ( !( 'font' in this.style ) ) {
	        this.style.font = { };
	    }

	    if ( !( 'style' in this.style.font ) ) {
	        this.style.font.style = 'normal';
	    }

	    if ( !( 'weight' in this.style.font ) ) {
	        this.style.font.weight = 'normal';
	    }

	    if ( !( 'size' in this.style.font ) ) {
	        this.style.font.size = 16;
	    }

	    if ( !( 'family' in this.style.font ) ) {
	        this.style.font.family = 'monospace';
	    }

	    if ( !( 'stroke' in this.style ) ) {
	        this.style.stroke = { };
	    }

	    if ( !( 'width' in this.style.stroke ) ) {
	        this.style.stroke.width = 0;
	    }
	}

	change ( content ) {
		this.content = content;
		this.cached = false;
	}

	cache ( ) {
	    const ctx = this.data.getContext( '2d' );
	    const { content, x, y, style } = this;
	    const { font, fill, stroke } = style;
	    const fontString = `${ font.style } ${ font.weight } ${ font.size }px ${ font.family }`.trim( );

	    ctx.font = fontString;
	    this.data = Math.ceil( ctx.measureText( content ).width + ( stroke.width * 2 ) ) || 1;
	    this.data = Math.ceil( ( font.size * 1.2 ) + ( stroke.width * 2 ) ) || 1;

	    ctx.imageSmoothingEnabled = false;
	    ctx.fillStyle = 'transparent';
	    ctx.strokeStyle = 'transparent';

	    ctx.font = fontString;
	    ctx.textAlign = 'left';
	    ctx.textBaseline = 'top';

	    if ( stroke.color ) {
	        ctx.strokeStyle = stroke.color;
	        ctx.lineWidth = stroke.width * 2 || 2;
	        ctx.strokeText(
	            content,
	            Math.round( stroke.width ),
	            Math.round( stroke.width )
	        );
	    }

	    if ( fill ) {
	        ctx.fillStyle = fill;
	        ctx.fillText(
	            content,
	            Math.round( stroke.width ),
	            Math.round( stroke.width )
	        );
	    }

	    this.cached = true;
	}

}