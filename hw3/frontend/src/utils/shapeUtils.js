import { SHAPE_TYPES, DEFAULT_SHAPE_SIZE } from './constants';

export const createShape = (type, x, y) => ({
    id: Date.now(),
    type,
    x,
    y,
    size: DEFAULT_SHAPE_SIZE,
});

export const getShapeCounts = (shapes) =>
    shapes.reduce(
        (acc, shape) => {
            acc[shape.type] = (acc[shape.type] || 0) + 1;
            return acc;
        },
        { [SHAPE_TYPES.CIRCLE]: 0, [SHAPE_TYPES.SQUARE]: 0, [SHAPE_TYPES.TRIANGLE]: 0 }
    );

export const renderShape = (shape, onDoubleClick) => {
    const { id, type, x, y, size } = shape;
    switch (type) {
        case SHAPE_TYPES.SQUARE:
            return (
                <rect
                    x={x - size / 2}
                    y={y - size / 2}
                    width={size}
                    height={size}
                    fill="blue"
                    onDoubleClick={() => onDoubleClick(id)}
                />
            );
        case SHAPE_TYPES.CIRCLE:
            return (
                <circle
                    cx={x}
                    cy={y}
                    r={size / 2}
                    fill="red"
                    onDoubleClick={() => onDoubleClick(id)}
                />
            );
        case SHAPE_TYPES.TRIANGLE:
            return (
                <polygon
                    points={`
            ${x},${y - size / 2}
            ${x - size / 2},${y + size / 2}
            ${x + size / 2},${y + size / 2}
          `}
                    fill="green"
                    onDoubleClick={() => onDoubleClick(id)}
                />
            );
        default:
            return null;
    }
};