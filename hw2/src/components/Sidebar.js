import React from 'react';

const Sidebar = ({ selectedShape, setSelectedShape }) => {
    return (
        <aside className="w-20 bg-gray-200 p-4 flex flex-col items-center" style={{ height: '100vh' }}>
            <div className="text-center mb-4">Tools</div>
            <div
                className={`w-12 h-12 bg-red-400 rounded-full mb-4 cursor-pointer ${selectedShape === "circle" ? "border-4 border-black" : ""}`}
                onClick={() => setSelectedShape("circle")}
            ></div>
            <div
                className={`w-12 h-12 bg-blue-400 mb-4 cursor-pointer ${selectedShape === "square" ? "border-4 border-black" : ""}`}
                onClick={() => setSelectedShape("square")}
            ></div>
            <div
                className={`w-12 h-12 bg-green-400 mb-4 cursor-pointer ${selectedShape === "triangle" ? "border-4 border-black" : ""}`}
                style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
                onClick={() => setSelectedShape("triangle")}
            ></div>
        </aside>
    );
};

export default Sidebar;