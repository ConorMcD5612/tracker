import React, { useState, useEffect } from 'react';
import { useStopwatch } from "react-use-precision-timer";
//https://www.npmjs.com/package/react-use-precision-timer?activeTab=readme

export const Timer = () => {
  const stopwatch = useStopwatch();
  const [[minutes, seconds], setMinSec] = useState([0, 0])
  const [startSeconds, setStartSeconds] = useState(40*60)

  const startTimer = () => {
    stopwatch.start();
    console.log("start timer")
  }

  const pauseHandler = () => {
    stopwatch.isPaused() ? stopwatch.resume() : stopwatch.pause()
    console.log(stopwatch.isPaused)
  }

  const unixToMinSec = () => {

    const totalSeconds = Math.ceil(startSeconds - (stopwatch.getElapsedRunningTime() / 1000))
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)
   
    return {minutes, seconds}
  }

  useEffect(() => {
   const interval = setInterval(() => {
    const {minutes, seconds} = unixToMinSec();
    setMinSec([minutes, seconds])
    console.log(minutes, seconds)
   }, 1000)

  return () => clearInterval(interval)
  }, [])

 
  return (
    <div>
     <button onClick={() => startTimer()}>START BUTTON </button>
     <div>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
     <button onClick={() => pauseHandler()}>PAUSE BUTTON</button>
    </div>
  );
};
