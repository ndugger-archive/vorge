import Internal from './state-internal';

export { Internal as internal }

export default Object.freeze( {

	get width ( ) { return Internal.canvas.width },
	get height ( ) { return Internal.canvas.height },
	get canvas ( ) { return Internal.canvas },
	get container ( ) { return Internal.canvas.parentNode },

	get camera ( ) { return Internal.camera },

	get map ( ) { return Internal.map },

	get player ( ) { return Internal.player },

	get paused ( ) { return Internal.paused },

	get ext ( ) { return Internal.ext }

} );
