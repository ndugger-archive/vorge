const CLIP = { x: 0, y: 0, w: 0, h: 0 };

export default function image ({ data = new Image(), x = 0, y = 0, clip = CLIP }) {
    if (!clip.hasOwnProperty('x')) {
        clip.x = 0;
    }

    if (!clip.hasOwnProperty('y')) {
        clip.y = 0;
    }

    return { type: 'image', data, x, y, clip };
}
