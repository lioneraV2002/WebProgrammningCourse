import React from 'react';

const Footer = ({ shapeCounts }) => {
    return (
        <footer className="bg-gray-800 text-white p-4 flex justify-center space-x-6 border-t-2 border-gray-300" style={{ height: '10vh' }}>
            <div className="flex items-center">
                <div className="w-4 h-4 bg-red-400 rounded-full mr-2"></div>
                <span>{shapeCounts.circle}</span>
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-400 mr-2"></div>
                <span>{shapeCounts.square}</span>
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 mr-2" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
                <span>{shapeCounts.triangle}</span>
            </div>
        </footer>
    );
};

export default Footer;