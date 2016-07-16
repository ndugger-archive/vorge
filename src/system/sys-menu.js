function openMenu () {
	return this;
}

function closeMenu () {
	return this;
}

export default function menu (controls = [], config = {}) {

	return {
		open: openMenu,
		close: closeMenu
	}
}
