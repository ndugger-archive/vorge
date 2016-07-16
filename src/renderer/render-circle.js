import image from '../graphics/gfx-image';
import renderImage from './render-image';

export default function renderCircle (context, circle) {
    if (circle.cached && (circle.cached.x !== circle.x || circle.cached.y !== circle.y)) {
        const { x, y, cached } = circle;
        return drawImage(canvas, Object.assign(cached, { x, y }));
    }

    if (circle.cached) {
        return drawImage(canvas, circle.cached);
    }

    const cache = document.createElement('canvas');
    const cacheContext = cache.getContext('2d');
    const { x, y, radius, style } = circle;
    const { fill, stroke } = style;

    cache.width = Math.ceil((radius * 2) + stroke.width);
    cache.height = Math.ceil((radius * 2) + stroke.width);

    cacheContext.imageSmoothingEnabled = false;
    cacheContext.fillStyle = 'transparent';
    cacheContext.strokeStyle = 'transparent';

    cacheContext.beginPath();
    cacheContext.arc(
        Math.round(radius + (stroke.width / 2)),
        Math.round(radius + (stroke.width / 2)),
        Math.round(radius),
        0, Math.PI * 2
    );
    cacheContext.closePath();

    if (fill) {
        cacheContext.fillStyle = fill;
        cacheContext.fill();
    }

    if (stroke.color) {
        cacheContext.strokeStyle = stroke.color;
        cacheContext.lineWidth = stroke.width || 2;
        cacheContext.stroke();
    }

    circle.cached = image({ data: cache, x, y });

    return drawImage(canvas, circle.cached);
}
