import React, { useEffect, useState } from 'react';

function formatDate(date) {
    if(!date) return '';
    
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    
    return `${hours}:${minutes}:${seconds}`;
}

function Clock(props) {
    const [timeString, setTimeString] = useState('')

    useEffect(() => {
        const IntervalClock = setInterval(() => {
            const now = new Date(); // lấy thời gian hiện tại
            const newTimeString = formatDate(now); // đem đi format lại theo hh:mm:ss

            setTimeString(newTimeString);
        },1000);

        return () => {
            console.log('Clock cleanup');
            clearInterval(IntervalClock)
        }

    }, []);

    return (
        <p className="Clock">{timeString}</p>
    );
}

export default Clock;