import image from '../graphics/gfx-image';
import renderImage from './render-image';

export default function renderRectangle (canvas, rectangle) {
    if (rectangle.cached && (rectangle.cached.x !== rectangle.x || rectangle.cached.y !== rectangle.y)) {
        const { x, y, cached } = rectangle;
        return drawImage(canvas, Object.assign(cached, { x, y }));
    }

    if (rectangle.cached) {
        return drawImage(canvas, rectangle.cached);
    }

    const cache = document.createElement('canvas');
    const cacheContext = cache.getContext('2d');
    const { x, y, w, h, style } = rectangle;
    const { fill, stroke } = style;

    cache.width = Math.ceil(w + stroke.width);
    cache.height = Math.ceil(h + stroke.width);

    cacheContext.imageSmoothingEnabled = false;
    cacheContext.fillStyle = 'transparent';
    cacheContext.strokeStyle = 'transparent';

    cacheContext.rect(
        Math.round(stroke.width / 2),
        Math.round(stroke.width / 2),
        Math.round(w),
        Math.round(h)
    );

    if (fill) {
        cacheContext.fillStyle = fill;
        cacheContext.fill();
    }

    if (stroke.color) {
        cacheContext.strokeStyle = stroke.color;
        cacheContext.lineWidth = stroke.width || 2;
        cacheContext.stroke();
    }

    rectangle.cached = image({ data: cache, x, y });

    return drawImage(canvas, rectangle.cached);
}
