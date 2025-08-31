import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
    const [isrunning, setisrunning] = useState(false);
    const [elapsedtime, setelapsedtime] = useState(0);
    const intervalidref = useState(null);
    const starttimeref = useRef(0);

    useEffect(() => {
        if (isrunning) {
            intervalidref.current = setInterval(() => {
                setelapsedtime(Date.now() - starttimeref.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalidref.current);
        }

    }, [isrunning]);

    function start() {
        setisrunning(true);
        starttimeref.current = Date.now() - elapsedtime;
    }

    function stop() {
        setisrunning(false);

    }

    function reset() {
        setelapsedtime(0);
        setisrunning(false);
    }

    function formattime() {
        let hours = Math.floor(elapsedtime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedtime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedtime / (1000) % 60);
        let milliseconds = Math.floor((elapsedtime % 1000) / 10);

        hours = String(hours).padStart(2,"0" );
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");


        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="stopwatch-bg">
            <h1>STOP-WATCH</h1>
            <div className="stopwatch">
                <div className="display">
                    {formattime()}
                </div>
                <div className="controls">
                    <button onClick={start} className="start-btn">Start</button>
                    <button onClick={stop} className="stop-btn">Stop</button>
                    <button onClick={reset} className="reset-btn" >Reset</button>
                </div>
            </div>
        </div>

    );
}
export default Stopwatch;