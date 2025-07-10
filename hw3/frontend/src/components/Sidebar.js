import React from 'react';
import PropTypes from 'prop-types';
import { SHAPE_TYPES, SHAPE_COLORS } from '../utils/constants';

const Sidebar = ({ selectedShape, setSelectedShape }) => {
    const handleDragStart = (e, shapeType) => {
        e.dataTransfer.setData('text/plain', shapeType);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleClick = (shapeType) => {
        setSelectedShape(shapeType === selectedShape ? null : shapeType);
    };

    return (
        <aside className="w-20 bg-gray-200 p-4 flex flex-col items-center h-screen">
            <div className="text-center mb-4">Tools</div>
            {Object.values(SHAPE_TYPES).map((type) => (
                <div
                    key={type}
                    draggable
                    className={`w-12 h-12 bg-${SHAPE_COLORS[type]} mb-4 cursor-pointer ${selectedShape === type ? 'border-4 border-black' : ''} ${type === SHAPE_TYPES.CIRCLE ? 'rounded-full' : ''}`}
                    style={type === SHAPE_TYPES.TRIANGLE ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } : {}}
                    onClick={() => handleClick(type)}
                    onDragStart={(e) => handleDragStart(e, type)}
                />
            ))}
        </aside>
    );
};

Sidebar.propTypes = {
    selectedShape: PropTypes.string,
    setSelectedShape: PropTypes.func.isRequired,
};

export default Sidebar;