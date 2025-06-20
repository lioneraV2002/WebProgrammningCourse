import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const App = () => {
    const [title, setTitle] = useState("Painting Title");
    const [shapes, setShapes] = useState([]);
    const [selectedShape, setSelectedShape] = useState(null);
    const canvasRef = useRef(null);

    const handleCanvasClick = (e) => {
        if (!selectedShape) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log("Canvas clicked at:", x, y, "with selectedShape:", selectedShape); // Debug log
        const newShape = {
            id: Date.now(),
            type: selectedShape,
            x,
            y,
            size: 50,
        };
        setShapes([...shapes, newShape]);
        setSelectedShape(null); // Clear selection after placing
    };

    const handleShapeDoubleClick = (id) => {
        setShapes(shapes.filter((shape) => shape.id !== id));
    };

    const handleExport = () => {
        const data = {
            title,
            shapes,
            timestamp: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                setTitle(data.title || "Imported Picture");
                setShapes(data.shapes || []);
            } catch (error) {
                alert("Invalid JSON file");
            }
        };
        reader.readAsText(file);
    };

    const shapeCounts = shapes.reduce(
        (acc, shape) => {
            acc[shape.type] = (acc[shape.type] || 0) + 1;
            return acc;
        },
        { square: 0, circle: 0, triangle: 0 }
    );

    const handleDrop = (e) => {
        e.preventDefault();
        const shapeType = e.dataTransfer.getData('text/plain');
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newShape = {
            id: Date.now(),
            type: shapeType,
            x,
            y,
            size: 50,
        };
        setShapes([...shapes, newShape]);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header title={title} setTitle={setTitle} handleExport={handleExport} handleImport={handleImport} />
            <div className="flex flex-1">
                <Canvas
                    canvasRef={canvasRef}
                    shapes={shapes}
                    handleCanvasClick={handleCanvasClick}
                    handleShapeDoubleClick={handleShapeDoubleClick}
                    handleDrop={handleDrop}
                />
                <Sidebar selectedShape={selectedShape} setSelectedShape={setSelectedShape} />
            </div>
            <Footer shapeCounts={shapeCounts} />
        </div>
    );
};

export default App;