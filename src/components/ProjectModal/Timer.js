import React from 'react'
import { Pause, Check } from 'react-feather'
import { useState, useEffect, useRef } from 'react'

export const Timer = () => {
    //Timer / time
    //Pause btn 
    // pause btn switches to start btn
    //need to be able to set time 
    const [timer, setTimer] = useState("01:00")
    const [addTime, setAddTime] = useState(60)
    const [showInput, setShowInput] = useState(false)

    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        // I think u are taking the time that is sarted and subtracting the time as of now
        //e is the time that the timer started, date is current time in that moment
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    const startTimer = (e) => {
        console.log(e, "e in starttimer")
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {

            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + addTime);
        return deadline;
    }


    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    const changeTimer = (e) => {
        let seconds = Number(e.target.value.slice(3))
        let minutes = Number(e.target.value.slice(0, 2))
        let newTime = (minutes*60) + seconds

        setTimer(e.target.value)
        setAddTime(newTime)
    }

    const blurHandler = () => {
        // check input regex 
        //first character [0-9][0-9]:[0-9][0-9]
        const regex = /[0-9][0-9]:[0-9][0-9]/
        if(regex.test(timer)) {
            setShowInput(false)
        } else {
            console.log("invalid input for timer format is : 00:00")
        }
    }

   


    return (

        <div className='timer-container'>
            <div className='timer-flex'>
            {showInput ? (
                <input autoFocus type="text" onBlur={blurHandler} onChange={(e) => changeTimer(e)} name="description" />
            ) : (
                <div onDoubleClick={() => setShowInput(true)} className='timer'>
                    <h2>{timer}</h2>
                </div >
            )}


            <div className='timerbtn-flex'>

                <button className='pause-btn'>
                    <Pause />
                </button>
                <button className='done-btn' onClick={onClickReset}><Check /></button>
            </div>
            </div>
        </div >

    )
}