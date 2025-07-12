import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { createShape, getShapeCounts, exportCanvas, importCanvas } from './utils/shapeUtils';

const App = () => {
    const [title, setTitle] = useState('Painting Title');
    const [shapes, setShapes] = useState([]);
    const [selectedShape, setSelectedShape] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [paintingId, setPaintingId] = useState(null); // Track current painting ID
    const canvasRef = useRef(null);

    const handleCanvasClick = (e) => {
        if (!selectedShape) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setShapes([...shapes, createShape(selectedShape, x, y)]);
        setSelectedShape(null);
    };

    const handleShapeDoubleClick = (id) => {
        setShapes(shapes.filter((shape) => shape.id !== id));
    };

    const handleExport = () => exportCanvas(title, shapes, paintingId, setPaintingId);
    const handleImport = (id) => {
        importCanvas(id, setTitle, setShapes, setPaintingId);
        setShowImportModal(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const shapeType = e.dataTransfer.getData('text/plain');
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setShapes([...shapes, createShape(shapeType, x, y)]);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header
                title={title}
                setTitle={setTitle}
                onExport={handleExport}
                onImport={handleImport}
                showImportModal={showImportModal}
                setShowImportModal={setShowImportModal}
                paintingId={paintingId}
                setPaintingId={setPaintingId}
            />
            <div className="flex flex-1">
                <Canvas
                    canvasRef={canvasRef}
                    shapes={shapes}
                    onCanvasClick={handleCanvasClick}
                    onShapeDoubleClick={handleShapeDoubleClick}
                    onDrop={handleDrop}
                />
                <Sidebar selectedShape={selectedShape} setSelectedShape={setSelectedShape} />
            </div>
            <Footer shapeCounts={getShapeCounts(shapes)} />
        </div>
    );
};

export default App;