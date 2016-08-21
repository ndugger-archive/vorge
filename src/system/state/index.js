import Internal from './internal';

export { Internal as internal };

export default Object.freeze( {

	get canvas ( ) { return Internal.canvas },
	get camera ( ) { return Internal.camera },
	get container ( ) { return Internal.canvas.parentNode },
	get controller ( ) { return Internal.controller },
	get map ( ) { return Internal.map },
	get player ( ) { return Internal.player },
	get paused ( ) { return Internal.paused },
	get settings ( ) { return Internal.settings },

	get ext ( ) { return Internal.ext }

} );
