import axios from 'axios';
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

export const exportCanvas = async (title, shapes, paintingId, setPaintingId, token) => {
    try {
        if (!title.trim()) {
            alert('Title cannot be empty');
            return;
        }
        if (!Array.isArray(shapes)) {
            alert('Invalid shapes data');
            return;
        }
        const payload = { title, shapes: JSON.stringify(shapes) };
        const config = { headers: { Authorization: `Bearer ${token}` } };
        let response;
        if (paintingId) {
            response = await axios.put(`http://localhost:8080/api/paintings/${paintingId}`, payload, config);
        } else {
            response = await axios.post('http://localhost:8080/api/paintings', payload, config);
        }
        if (response.data && response.data.id) {
            setPaintingId(response.data.id);
            alert(`Painting ${paintingId ? 'updated' : 'saved'} with ID: ${response.data.id}`);
        } else {
            alert('Failed to save painting: No ID returned');
        }
    } catch (error) {
        alert(`Failed to ${paintingId ? 'update' : 'save'} painting`);
        console.error(error);
    }
};

export const importCanvas = async (id, setTitle, setShapes, setPaintingId, token) => {
    try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`http://localhost:8080/api/paintings/${id}`, config);
        const { title, shapes, id: paintingId } = response.data;
        setTitle(title || 'Imported Picture');
        setShapes(JSON.parse(shapes) || []);
        setPaintingId(paintingId);
    } catch (error) {
        alert('Failed to load painting');
        console.error(error);
    }
};

export const fetchPaintings = async (token) => {
    try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:8080/api/paintings', config);
        return response.data || [];
    } catch (error) {
        console.error('Failed to fetch paintings:', error);
        throw error;
    }
};