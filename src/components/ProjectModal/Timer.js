import React from 'react'
import { Pause, Check, Play } from 'react-feather'
import { useState, useEffect, useRef } from 'react'

export const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerRunning, setTimerRunning] = useState(true);
    const [showInput, setShowInput] = useState(false)

    useEffect(() => {
        let interval;
        //this should be when the timer starts? 
        const startTime = Date.now()
        if(timerRunning && timeLeft > 0){
            interval = setInterval(() => {
              setTimeLeft(Date.now() - )
                //this doesn't update time 
             
            }, 1000)
        }
        
        return () => clearInterval(interval)
    }, [timerRunning, timeLeft])

    function handlePause() {
        setTimerRunning(!timerRunning);
    }


    function handleReset() {    
        setTimeLeft(60);
        setTimerRunning(true);
    }


    ///these two functions are going to be two seperate componenets
    const blurHandler = () => {
        // check input regex 00:00 format 
        // const regex = /[0-9][0-9]:[0-9][0-9]/
        // if (regex.test(timer)) {
        //     setShowInput(false)
        // } else {
        //     console.log("invalid input for timer format is : 00:00")
        // }
    }

    const changeTimer = (e) => {
        // let seconds = Number(e.target.value.slice(3))
        // let minutes = Number(e.target.value.slice(0, 2))
        // let newTime = (minutes * 60) + seconds

        // setTimer(e.target.value)
        // setAddTime(newTime)
    }

    return (

        <div className='timer-container'>
            <div className='timer-flex'>
                {showInput ? (
                    <input autoFocus type="text" onBlur={blurHandler} onChange={(e) => changeTimer(e)} name="description" />
                ) : (
                    <div onDoubleClick={() => setShowInput(true)} className='timer'>
                        <h2>{timeLeft}</h2>
                    </div>
                )}
                <div className='timerbtn-flex'>

                    {setTimerRunning ? (
                        <button className='pause-btn' onClick={handlePause}>
                            <Play />
                        </button>
                    ) : (
                        <button onClick={handlePause} className='pause-btn'>
                            <Pause />
                        </button>
                    )}

                    <button className='done-btn' onClick={handleReset}><Check /></button>
                </div>
            </div>
        </div >

    )
}
