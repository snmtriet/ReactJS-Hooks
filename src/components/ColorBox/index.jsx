import React, { useState } from 'react';
import './ColorBox.scss';

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'red', 'green', 'yellow', 'orange'];
    const randomIndex = Math.trunc(Math.random() * 5)
    return COLOR_LIST[randomIndex];
}
function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box-color') || 'deeppink';
        console.log(initColor);
        return initColor;
    });
    function handleBoxClick() {
        // get random color -> set color
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box-color', newColor);
    }
    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
            Hooks
        </div>
    );
}

export default ColorBox;