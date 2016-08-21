import image from '../graphics/gfx-image';
import renderImage from './render-image';

export default function renderRectangle (canvas, rectangle) {
    if (rectangle.cached && (rectangle.cached.x !== rectangle.x || rectangle.cached.y !== rectangle.y)) {
        const { x, y, cached } = rectangle;
        return renderImage(canvas, Object.assign(cached, { x, y }));
    }

    if (rectangle.cached) {
        return renderImage(canvas, rectangle.cached);
    }

    const cache = document.createElement('canvas');
    const cacheContext = cache.getContext('2d');
    const { x, y, width, height, style = { } } = rectangle;
    const { fill, stroke } = style;

    cache.width = Math.ceil(width + (stroke.width * 2));
    cache.height = Math.ceil(height + (stroke.width * 2));

    cacheContext.imageSmoothingEnabled = false;
    cacheContext.fillStyle = 'transparent';
    cacheContext.strokeStyle = 'transparent';

    if (stroke.color) {
        cacheContext.strokeStyle = stroke.color;
        cacheContext.lineWidth = stroke.width * 2 || 2;
        cacheContext.strokeRect(
            Math.round(stroke.width),
            Math.round(stroke.width),
            Math.round(width),
            Math.round(height)
        );
    }

    if (fill) {
        cacheContext.fillStyle = fill;
        cacheContext.fillRect(
            Math.round(stroke.width),
            Math.round(stroke.width),
            Math.round(width),
            Math.round(height)
        );
    }

    rectangle.cached = image({ data: cache, x, y });

    return renderImage(canvas, rectangle.cached);
}
