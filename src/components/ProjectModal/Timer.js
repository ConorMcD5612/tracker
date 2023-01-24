import React from 'react'
import { Pause } from 'react-feather'
import { useState, useEffect, useRef } from 'react'

export const Timer = () => {
    //Timer / time
    //Pause btn 
    // pause btn switches to start btn
    //need to be able to set time 
    const [timer, setTimer] = useState("01:10")

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
        // to code next    
        setTimer('01:10');
        console.log(e, "e in cleartimer")
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
        deadline.setSeconds(deadline.getSeconds() + 70);
        return deadline;
    }
    
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);

    const onClickReset = () => {
        clearTimer(getDeadTime());
    }





    return (
        <div>
            <h2>{timer}</h2>
            <button onClick={clearTimer}> ADD TIME</button>
            <button >
                <Pause />
            </button>
            <button onClick={onClickReset}>Done</button>
        </div>

    )
}
