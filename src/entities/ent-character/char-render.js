import * as renderer from '../../renderer';

export default function renderCharacter (character) {
	renderer.render(character.sprite);
	renderer.render(character.label);
}