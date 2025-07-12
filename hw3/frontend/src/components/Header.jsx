import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchPaintings } from '../utils/shapeUtils';

const Header = ({ title, setTitle, onExport, onImport, showImportModal, setShowImportModal, paintingId, setPaintingId }) => {
    const [paintings, setPaintings] = useState([]);
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (showImportModal) {
            fetchPaintings(token).then(setPaintings).catch(() => alert('Failed to load paintings'));
        }
    }, [showImportModal, token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded w-1/3"
                placeholder="Canvas Title"
            />
            <div className="flex space-x-2">
                <button
                    onClick={onExport}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Export
                </button>
                <button
                    onClick={() => setShowImportModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Import
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>

            {showImportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Select a Painting</h2>
                        {paintings.length === 0 ? (
                            <p className="text-gray-600">No paintings available</p>
                        ) : (
                            <ul className="max-h-64 overflow-y-auto">
                                {paintings.map((painting) => (
                                    <li
                                        key={painting.id}
                                        className="p-2 hover:bg-gray-200 cursor-pointer text-gray-800"
                                        onClick={() => onImport(painting.id)}
                                    >
                                        {painting.title} (ID: {painting.id})
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            onClick={() => setShowImportModal(false)}
                            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
    showImportModal: PropTypes.bool.isRequired,
    setShowImportModal: PropTypes.func.isRequired,
    paintingId: PropTypes.number,
    setPaintingId: PropTypes.func.isRequired,
};

export default Header;