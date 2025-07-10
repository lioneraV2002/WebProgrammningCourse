import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, setTitle, onExport, onImport }) => (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded w-1/3"
        />
        <div className="flex space-x-2">
            <button
                onClick={onExport}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Export
            </button>
            <input
                type="file"
                accept=".json"
                onChange={onImport}
                className="hidden"
                id="import-file"
            />
            <button
                onClick={() => document.getElementById('import-file').click()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Import
            </button>
        </div>
    </header>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
};

export default Header;