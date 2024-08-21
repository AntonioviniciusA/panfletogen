import React, { useState } from "react";

const DraggableElement = () => {
  const [isDragging, setIsDragging] = useState(null);
  const [positions, setPositions] = useState({
    box1: { x: 100, y: 100 },
  });

  const handleMouseDown = (event, box) => {
    setIsDragging(box);
    event.target.style.cursor = "grabbing";
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newX = event.clientX - 50;
      const newY = event.clientY - 50;

      setPositions((prevPositions) => ({
        ...prevPositions,
        [isDragging]: { x: newX, y: newY },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: `${positions.box1.y}px`,
          left: `${positions.box1.x}px`,
          cursor: "grab",
        }}
        onMouseDown={(event) => handleMouseDown(event, "box1")}
      ></div>
    </div>
  );
};

export default DraggableElement;
