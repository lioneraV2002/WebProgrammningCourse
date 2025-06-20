import React from 'react';

const Canvas = ({ canvasRef, shapes, handleCanvasClick, handleShapeDoubleClick, handleDrop }) => {
    return (
        <main
            className="flex-1 bg-gray-100 relative border-r-2 border-gray-300 p-4"
            onClick={handleCanvasClick} // Move click handler to main container
        >
            <canvas
                ref={canvasRef}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
                onDragOver={(e) => e.preventDefault()} // Allow drop on canvas
            ></canvas>
            <svg
                className="absolute top-0 left-0 w-full h-full"
                onDragOver={(e) => e.preventDefault()} // Allow drop on SVG
                onDrop={handleDrop}
            >
                {shapes.map((shape) => (
                    <g
                        key={shape.id}
                        onDoubleClick={() => handleShapeDoubleClick(shape.id)}
                        className="pointer-events-auto cursor-pointer"
                    >
                        {shape.type === "square" && (
                            <rect
                                x={shape.x - shape.size / 2}
                                y={shape.y - shape.size / 2}
                                width={shape.size}
                                height={shape.size}
                                fill="blue"
                            />
                        )}
                        {shape.type === "circle" && (
                            <circle
                                cx={shape.x}
                                cy={shape.y}
                                r={shape.size / 2}
                                fill="red"
                            />
                        )}
                        {shape.type === "triangle" && (
                            <polygon
                                points={`
                  ${shape.x},${shape.y - shape.size / 2}
                  ${shape.x - shape.size / 2},${shape.y + shape.size / 2}
                  ${shape.x + shape.size / 2},${shape.y + shape.size / 2}
                `}
                                fill="green"
                            />
                        )}
                    </g>
                ))}
            </svg>
        </main>
    );
};

export default Canvas;