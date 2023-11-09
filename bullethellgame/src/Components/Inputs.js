// KeyboardInput.js
import React, { useEffect, useState } from 'react';
import Canvas from './Canvas';

const KeyboardInput = () => {
    const [pressedKeys, setPressedKeys] = useState({});

  const handleKeyDown = (event) => {
    setPressedKeys((prev) => ({ ...prev, [event.key]: true }));
  };

  const handleKeyUp = (event) => {
    setPressedKeys((prev) => ({ ...prev, [event.key]: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      <Canvas pressedKeys={pressedKeys} />
    </div>
  );
};

export default KeyboardInput;
