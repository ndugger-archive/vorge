import image from '../graphics/gfx-image';
import renderImage from './render-image';

export default function renderPolygon (canvas, polygon) {
    if (polygon.cached && (polygon.cached.x !== polygon.x || polygon.cached.y !== polygon.y)) {
        const { x, y, cached } = polygon;
        return drawImage(canvas, Object.assign(cached, { x, y }));
    }

    if (polygon.cached) {
        return drawImage(canvas, polygon.cached);
    }

    const cache = document.createElement('canvas');
    const cacheContext = cache.getContext('2d');
    const { points, x, y, w, h, style } = polygon;
    const { fill, stroke } = style
    let i = 0;

    cache.width = Math.ceil(w + stroke.width);
    cache.height = Math.ceil(h + stroke.width);

    cacheContext.moveTo(0, 0);
    cacheContext.beginPath();

    while (i++ < points.length) {
        if (points[i].type === 'move') {
            const [x, y] = points[i].move;
            return cacheContext.moveTo(
                Math.round(x),
                Math.round(y)
            );
        }

        if (points[i].type === 'line') {
            const [x, y] = points[i].line;
            return cacheContext.lineTo(
                Math.round(x),
                Math.round(y)
            );
        }

        if (points[i].type === 'arc') {
            const [cp1x, cp1t, cp2x, cp2y, radius] = points[i].arc;
            return cacheContext.arcTo(
                Math.round(cp1x),
                Math.round(cp1y),
                Math.round(cp2x),
                Math.round(cp2y),
                Math.round(radius)
            );
        }

        if (points[i].type === 'bezier') {
            const [cp1x, cp1t, cp2x, cp2y, x, y] = points[i].bezier;
            return cacheContext.bezierCurveTo(
                Math.round(cp1x),
                Math.round(cp1y),
                Math.round(cp2x),
                Math.round(cp2y),
                Math.round(x),
                Math.round(y)
            );
        }

        if (points[i].type === 'quadratic') {
            const [cpx, cpy, x, y] = points[i].quadratic;
            return cacheContext.quadraticCurveTo(
                Math.round(cpx),
                Math.round(cpy),
                Math.round(x),
                Math.round(y)
            );
        }

        if (points[i].type === 'rotate') {
            return cacheContext.rotate(points[i].angle);
        }
    }

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

    polygon.cached = image({ data: cache, x, y });

    return drawImage(canvas, polygon.cached);

}
