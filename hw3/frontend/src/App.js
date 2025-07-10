import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { createShape, getShapeCounts } from './utils/shapeUtils';
import { saveAs } from 'file-saver';

const App = () => {
    const [title, setTitle] = useState('Painting Title');
    const [shapes, setShapes] = useState([]);
    const [selectedShape, setSelectedShape] = useState(null);
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

    const handleExport = () => {
        const data = { title, shapes, timestamp: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        saveAs(blob, `${title}.json`); // Using file-saver
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                setTitle(data.title || 'Imported Picture');
                setShapes(data.shapes || []);
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
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
            <Header title={title} setTitle={setTitle} onExport={handleExport} onImport={handleImport} />
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