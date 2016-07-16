export default function renderImage (canvas, { data, x, y, clip }) {
    const context = canvas.getContext('2d');

    context.imageSmoothingEnabled = false;

    if (clip.w || clip.h) {
        return context.drawImage(
            data,
            clip.x, clip.y, clip.w, clip.h,
            Math.round(x), Math.round(y), clip.w, clip.h 
        );
    }

    context.drawImage(data, x, y);
}
