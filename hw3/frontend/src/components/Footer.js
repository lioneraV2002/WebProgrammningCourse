import React from 'react';
import PropTypes from 'prop-types';
import { SHAPE_TYPES, SHAPE_COLORS } from '../utils/constants';

const Footer = ({ shapeCounts }) => (
    <footer className="bg-gray-800 text-white p-4 flex justify-center space-x-6 border-t-2 border-gray-300 h-[10vh]">
        {Object.values(SHAPE_TYPES).map((type) => (
            <div key={type} className="flex items-center">
                <div
                    className={`w-4 h-4 bg-${SHAPE_COLORS[type]} mr-2 ${type === SHAPE_TYPES.TRIANGLE ? 'triangle' : type === SHAPE_TYPES.CIRCLE ? 'rounded-full' : ''}`}
                    style={type === SHAPE_TYPES.TRIANGLE ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } : {}}
                />
                <span>{shapeCounts[type]}</span>
            </div>
        ))}
    </footer>
);

Footer.propTypes = {
    shapeCounts: PropTypes.shape({
        [SHAPE_TYPES.CIRCLE]: PropTypes.number,
        [SHAPE_TYPES.SQUARE]: PropTypes.number,
        [SHAPE_TYPES.TRIANGLE]: PropTypes.number,
    }).isRequired,
};

export default Footer;