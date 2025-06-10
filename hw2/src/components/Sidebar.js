import React from 'react';

const Sidebar = ({ selectedShape, setSelectedShape }) => {
    const handleDragStart = (e, shapeType) => {
        e.dataTransfer.setData('text/plain', shapeType); // Set the dragged shape type
        e.dataTransfer.effectAllowed = 'move'; // Indicate move effect
        // Ensure click still works by not preventing default here
    };

    const handleClick = (shapeType) => {
        setSelectedShape(shapeType === selectedShape ? null : shapeType); // Toggle selection
    };

    return (
        <aside className="w-20 bg-gray-200 p-4 flex flex-col items-center" style={{ height: '100vh' }}>
            <div className="text-center mb-4">Tools</div>
            <div
                draggable="true"
                className={`w-12 h-12 bg-red-400 rounded-full mb-4 cursor-pointer ${selectedShape === "circle" ? "border-4 border-black" : ""}`}
                onClick={() => handleClick("circle")}
                onDragStart={(e) => handleDragStart(e, "circle")}
            ></div>
            <div
                draggable="true"
                className={`w-12 h-12 bg-blue-400 mb-4 cursor-pointer ${selectedShape === "square" ? "border-4 border-black" : ""}`}
                onClick={() => handleClick("square")}
                onDragStart={(e) => handleDragStart(e, "square")}
            ></div>
            <div
                draggable="true"
                className={`w-12 h-12 bg-green-400 mb-4 cursor-pointer ${selectedShape === "triangle" ? "border-4 border-black" : ""}`}
                style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
                onClick={() => handleClick("triangle")}
                onDragStart={(e) => handleDragStart(e, "triangle")}
            ></div>
        </aside>
    );
};

export default Sidebar;