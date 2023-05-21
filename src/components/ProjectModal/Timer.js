import React, { useState, useEffect } from 'react';
import { useStopwatch } from "react-use-precision-timer";
//https://www.npmjs.com/package/react-use-precision-timer?activeTab=readme

export const Timer = () => {
  const stopwatch = useStopwatch();
  const [[minutes, seconds], setMinSec] = useState([0, 0])
  const [startSeconds, setStartSeconds] = useState(10)


  const startTimer = () => {
    stopwatch.start();
  }

  const pauseHandler = () => {
    stopwatch.isPaused() ? stopwatch.resume() : stopwatch.pause()
  
  }

  const unixToMinSec = () => {

    const totalSeconds = Math.ceil(startSeconds - (stopwatch.getElapsedRunningTime() / 1000))
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    return { minutes, seconds }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      
      const { minutes, seconds } = unixToMinSec();
      setMinSec([minutes, seconds])
     
      if(minutes == 0 && seconds == 0)
      {
        stopwatch.stop()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])


  return ReactDOM.createPortal(
    <div className='timer'>

      <div className='timer-txt'>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
      <div className='timer-btns'>


        <button onClick={() => startTimer()}>{stopwatch.isStarted() ?
          `RESET`
          : `START`}</button>
        
         <button onClick={() => pauseHandler()}>{stopwatch.isRunning() ?
              `PAUSE`
              : `PLAY`}</button>
          
      
      </div>

    </div>,
    document.getElementById('timer-portal')
  );
};
