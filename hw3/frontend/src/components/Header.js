import React from 'react';

const Header = ({ title, setTitle, handleExport, handleImport }) => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded w-1/3"
            />
            <div>
                <button
                    onClick={handleExport}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Export
                </button>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    id="import-file"
                />
                <button
                    onClick={() => document.getElementById("import-file").click()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Import
                </button>
            </div>
        </header>
    );
};

export default Header;