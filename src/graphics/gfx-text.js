export default function text ({ content = '', x = 0, y = 0, style = { font: { }, fill: '', stroke: { } } } = { }) {
    if (!style.hasOwnProperty('font')) {
        style.font = { };
    }

    if (!style.font.hasOwnProperty('style')) {
        style.font.style = 'normal';
    }

    if (!style.font.hasOwnProperty('weight')) {
        style.font.weight = 'normal';
    }

    if (!style.font.hasOwnProperty('size')) {
        style.font.size = 16;
    }

    if (!style.font.hasOwnProperty('family')) {
        style.font.family = 'monospace';
    }

    if (!style.hasOwnProperty('stroke')) {
        style.stroke = { };
    }

    if (!style.stroke.hasOwnProperty('width')) {
        style.stroke.width = 0;
    }

    return { type: 'text', content, x, y, style };
}
