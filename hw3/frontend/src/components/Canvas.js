import React from 'react';
import PropTypes from 'prop-types';
import { renderShape } from '../utils/shapeUtils';

const Canvas = ({ canvasRef, shapes, onCanvasClick, onShapeDoubleClick, onDrop }) => (
    <main className="flex-1 bg-gray-100 relative border-r-2 border-gray-300 p-4" onClick={onCanvasClick}>
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            onDragOver={(e) => e.preventDefault()}
        />
        <svg className="absolute inset-0 w-full h-full" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
            {shapes.map((shape) => (
                <g key={shape.id} className="pointer-events-auto cursor-pointer">
                    {renderShape(shape, onShapeDoubleClick)}
                </g>
            ))}
        </svg>
    </main>
);

Canvas.propTypes = {
    canvasRef: PropTypes.object.isRequired,
    shapes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            size: PropTypes.number.isRequired,
        })
    ).isRequired,
    onCanvasClick: PropTypes.func.isRequired,
    onShapeDoubleClick: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
};

export default Canvas;