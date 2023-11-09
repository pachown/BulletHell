import React, { useState, useEffect, useRef } from "react";

const CanvasComponent = ({ pressedKeys }) => {
  const canvasRef = useRef(null);

  const [playerLocation, setPlayerLocation] = useState([500, 500]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let lastTimestamp = 0;
    let requestId;

    const draw = (timestamp) => {
      const elapsedMilliseconds = timestamp - lastTimestamp;

      const maxUpdateRate = 1000 / 60;
      const speed = 10;

      if (elapsedMilliseconds > maxUpdateRate) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        setPlayerLocation((prevLocation) => {
          let [x, y] = prevLocation;

          if (pressedKeys["ArrowUp"]) {
            y -= speed;
          }
          if (pressedKeys["ArrowDown"]) {
            y += speed;
          }
          if (pressedKeys["ArrowLeft"]) {
            x -= speed;
          }
          if (pressedKeys["ArrowRight"]) {
            x += speed;
          }
          x = Math.max(0, Math.min(990, x));
          y = Math.max(0, Math.min(990, y));

          lastTimestamp = timestamp;

          return [x, y];
        });

        requestId = requestAnimationFrame(draw);
        context.fillStyle = "green";
        context.fillRect(playerLocation[0], playerLocation[1], 10, 10);
      }

    };
    requestId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [pressedKeys, playerLocation]);

  return <canvas ref={canvasRef} width={1000} height={1000} />;
};

export default CanvasComponent;
