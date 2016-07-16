function isImage (path) {
	const ext = path.split('.').pop();
	const supported = [
		/png/,
		/jpe?g/,
		/gif/
	];

	return supported.some(x => x.exec(ext));
}

function loadImage (path) {
	return new Promise ((resolve, reject) => {
		const image = new Image();

		image.onload = e => resolve(image);
		image.onerror = e => reject(e);

		image.src = path;
	});
}

export default async function load (path) {
	if (isImage(path)) {
		return await loadImage(path);
	}
}