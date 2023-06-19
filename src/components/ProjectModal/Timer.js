import React, { useState, useEffect } from 'react';
import { useStopwatch } from "react-use-precision-timer";
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'react-feather';
import { useLocation } from 'react-router';
//https://www.npmjs.com/package/react-use-precision-timer?activeTab=readme

export const Timer = () => {
  const stopwatch = useStopwatch();
  const [[minutes, seconds], setMinSec] = useState([0, 0])
  const [startSeconds, setStartSeconds] = useState(60 * 40)
  const [showInput, setShowInput] = useState(false)



  const navigate = useNavigate();
  const { projectName, taskIndex} = useParams();
  

  const startTimer = () => {
    recordTime();
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
    console.log(projectName, taskIndex)
    const interval = setInterval(() => {

      const { minutes, seconds } = unixToMinSec();
      setMinSec([minutes, seconds])
      console.log(minutes, seconds)
      console.log()

      if (minutes == 0 && seconds == 0) {
        stopwatch.stop()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startSeconds])



  const recordTime = async () => {
    const totalElapsedSeconds = stopwatch.getElapsedRunningTime() / 1000

    await fetch(`http://localhost:5000/timer/${projectName}/task/${taskIndex}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ totalElapsedSeconds }) //have to make it an object for some reason??
    })
  }

  const closeModal = () => {
    navigate(-1)
    recordTime();
  }


  return (
    <div className='timer-container'>
      <div className='timer-overlay' onClick={() => closeModal()}>

      </div>

      <div className='timer'>
        <div className='timer-flex'>

          {showInput ?
            <input autoFocus type='number' onBlur={() => setShowInput(false)} onChange={(e) => setStartSeconds(e.target.value * 60)} name="minutes" /> :
            <span className='timer-text' onDoubleClick={() => setShowInput(true)}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</span>
          }


          <div className='timer-btns'>


            <button onClick={() => startTimer()}>{stopwatch.isStarted() ?
              `RESET`
              : `START`}</button>

            <button onClick={() => pauseHandler()}>{stopwatch.isRunning() ?
              `PAUSE`
              : `PLAY`}</button>


          </div>
        </div>


        <ArrowLeft onClick={() => closeModal()} className='back-btn' color='#24e2e8df' size={'2.5vw'} />

      </div>
    </div>
  );
};
