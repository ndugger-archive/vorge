import image from '../graphics/gfx-image';
import renderImage from './render-image';

export default function renderText (canvas, text) {
    if (text.cached && (text.cached.x !== text.x || text.cached.y !== text.y)) {
        const { x, y, cached } = text;
        return drawImage(canvas, Object.assign(cached, { x, y }));
    }

    if (text.cached) {
        return drawImage(canvas, text.cached);
    }

    const cache = document.createElement('canvas');
    const cacheContext = cache.getContext('2d');
    const { content, x, y, style } = text;
    const { font, fill, stroke } = style;
    const fontString = `${ font.style } ${ font.weight } ${ font.size }px ${ font.family }`.trim();

    cacheContext.font = fontString;
    cache.width = Math.ceil(cacheContext.measureText(content).width + stroke.width);
    cache.height = Math.ceil((font.size * 1.2) + stroke.width);

    cacheContext.imageSmoothingEnabled = false;
    cacheContext.fillStyle = 'transparent';
    cacheContext.strokeStyle = 'transparent';

    cacheContext.font = fontString;
    cacheContext.textAlign = 'left';
    cacheContext.textBaseline = 'top';

    if (fill) {
        cacheContext.fillStyle = fill;
        cacheContext.fillText(
            content,
            Math.round(stroke.width / 2),
            Math.round(stroke.width / 2)
        );
    }

    if (stroke.color) {
        cacheContext.strokeStyle = stroke.color;
        cacheContext.lineWidth = stroke.width || 2;
        cacheContext.strokeText(
            content,
            Math.round(stroke.width / 2),
            Math.round(stroke.width / 2)
        );
    }

    text.cached = image({ data: cache, x, y });

    return drawImage(canvas, text.cached);
}
