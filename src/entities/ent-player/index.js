import { internal } from '../../system/sys-state';
import { load, render as renderCharacter } from '../ent-character';

export update from './player-update';

export { load }

export function render () {
	return renderCharacter(internal.player);
}

export function use (player) {
	internal.player = player;
}