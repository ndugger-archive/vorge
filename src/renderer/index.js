import state from '../system/sys-state';

import renderImage from './render-image';
import renderCircle from './render-circle';
import renderPolygon from './render-polygon';
import renderRectangle from './render-rectangle';
import renderText from './render-text';

function warnUnknown (unknown = { warned: false }) {
    if (unknown.warned) {
        return;
    }

    console.warn('Cannot render unknown object, ' + JSON.stringify(unknown));

    unknown.warned = true;
}

function renderGroup (canvas, group) {
    let index = 0;

    while (index < group.children.length) {
        render(group.children[index]);

        index++;
    }
}

const types = {
    circle: renderCircle,
    group: renderGroup,
    image: renderImage,
    polygon: renderPolygon,
    rectangle: renderRectangle,
    text: renderText,
    unknown: warnUnknown
};

export function render (entity = { }) {
    const canvas = state.canvas;
    const { type = 'unknown' } = entity;

    return types[type](canvas, entity);
}

export function clear (x = 0, y = 0, w = state.canvas.width || 0, h = state.canvas.height || 0) {
    const canvas = state.canvas;
    const context = canvas.getContext('2d');

    return context.clearRect(x, y, w, h);
}
