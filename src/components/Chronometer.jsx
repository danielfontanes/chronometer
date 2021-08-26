import React, { useState, useEffect } from 'react';

import {generate as id} from 'shortid'

import styled from 'styled-components'



const Button = styled.button`
    background-color: ${({disabled})=>disabled ? 'transparent' : '#23A8EC'};
    border: ${({disabled})=>disabled ? '1px solid #23A8EC' : 'none'};
    color: ${({disabled})=>disabled ? '#23A8EC' : 'transparentnone'};
    border-radius: 10px;
    padding: .5rem;
    margin: .5rem;
`
const List = styled.ul`
    list-style: none;
    padding-left: 0;
`

const Chronometer = () => {
    const [clock, setClock] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        miliseconds: 0
    })
    const [running,setRunning] = useState(false)
    const [allTimestamps,setAllTimestamps] = useState([])
    const [started,setStarted] = useState(false)

    useEffect(() => {
        if(running){
            const interval = setInterval(()=>{
                tick()
            },10)
            return() => clearInterval(interval)
        }
    }, [running, clock]);
    
    const addZero = (value) => (
        value < 10 ? `0${value}` : value
    )

    const handleStartClick = () =>{
        if(!running){
            setRunning(true)
            setStarted(true)
        }
    }

    const handleStopClick = () =>{
        if(running){
            setRunning(false)
        }
    }

    const handleResetClick = () =>{
        updateTimer(0, 0, 0,0)
        setAllTimestamps([])
        setStarted(false)
    }

    const handleTimestamp = () => {
        const timestamp = {
            hours: clock.hours, 
            minutes: clock.minutes, 
            seconds: clock.seconds, 
            miliseconds: clock.miliseconds}

        setAllTimestamps([
            ...allTimestamps,
            timestamp
        ])
    }

    const tick = () => {
        let{hours,minutes,seconds,miliseconds} = clock 
        miliseconds = miliseconds + 1

        if(miliseconds === 100){
            miliseconds = 0
            seconds = seconds + 1
            if(seconds === 60){
                seconds = 0
                minutes = minutes + 1
                if (minutes === 60){
                    minutes = 0
                    hours = hours + 1
                }
            }
        }

        updateTimer(miliseconds, seconds, minutes,hours)
    }

    const updateTimer = (miliseconds, seconds, minutes,hours) => {
        setClock({miliseconds, seconds, minutes,hours})
    }



    let {hours,minutes,seconds,miliseconds} = clock
    hours= addZero(hours)
    minutes= addZero(minutes)
    seconds= addZero(seconds)
    miliseconds= addZero(miliseconds)
    return(
        <>
            <h3>{`${hours}:${minutes}:${seconds}:${miliseconds}`}</h3>

            <Button disabled={running} onClick={handleStartClick}>START</Button>
            <Button disabled={!running} onClick={handleStopClick}>STOP</Button>
            <Button disabled={!running} onClick={handleTimestamp}>TIMESTAMP</Button>
            <Button disabled={((!started && !running) || (started && running))} onClick={handleResetClick}>RESET</Button>
               
            <List>
                {allTimestamps.map((timestamps, idx)=>(
                    <li key={id()}>
                        {`
                            ${idx + 1} -
                            ${addZero(timestamps.hours)}:
                            ${addZero(timestamps.minutes)}:
                            ${addZero(timestamps.seconds)}:
                            ${addZero(timestamps.miliseconds)}
                        `}
                    </li>
                ))}
            </List>
        </>
    )

}

export default Chronometer;
