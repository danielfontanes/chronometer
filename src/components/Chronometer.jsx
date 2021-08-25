import React, { Component } from 'react';

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


class Chronometer extends Component {

    state = {
        hours:0,
        minutes:0,
        seconds:0,
        miliseconds:0,
        running: false,
        allTimestamps: [],
        started:false
    }

    addZero(value){
        return value < 10 ? `0${value}` : value
    }

    handleStartClick = () =>{
        if(!this.state.running){
            this.interval = setInterval(()=> {
                this.tick()
            },10)

            this.setState({running: true, started: true})
        }
    }

    handleStopClick = () =>{
        if(this.state.running){
            clearInterval(this.interval)
            this.setState({running: false})
        }
    }

    handleResetClick = () =>{
        this.updateTimer(0, 0, 0,0)
        this.setState({allTimestamps: [], started:false })
    }

    handleTimestamp = () => {
        const {hours, minutes, seconds, miliseconds, allTimestamps} = this.state
        const timestamp = {hours, minutes, seconds, miliseconds}
        const timestamps = allTimestamps

        timestamps.push(timestamp)

        this.setState({allTimestamps: timestamps})
    }

    tick() {
        let hours = this.state.hours 
        let minutes = this.state.minutes 
        let seconds = this.state.seconds 
        let miliseconds = this.state.miliseconds + 1

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

        this.updateTimer(miliseconds, seconds, minutes,hours)
    }

    updateTimer(miliseconds, seconds, minutes,hours){
        this.setState({
            miliseconds, seconds, minutes,hours
        })
    }



    render(){
        let {hours,minutes,seconds,miliseconds, running, allTimestamps, started} = this.state
        hours= this.addZero(hours)
        minutes= this.addZero(minutes)
        seconds= this.addZero(seconds)
        miliseconds= this.addZero(miliseconds)
        return(
            <>
                <h3>{`${hours}:${minutes}:${seconds}:${miliseconds}`}</h3>

                <Button disabled={running} onClick={this.handleStartClick}>START</Button>
                <Button disabled={!running} onClick={this.handleStopClick}>STOP</Button>
                <Button disabled={!running} onClick={this.handleTimestamp}>TIMESTAMP</Button>
                <Button disabled={((!started && !running) || (started && running))} onClick={this.handleResetClick}>RESET</Button>
               
                <List>
                     {allTimestamps.map((timestamps, idx)=>(
                         <li key={id()}>
                             {`
                                ${idx + 1} -
                                ${this.addZero(timestamps.hours)}:
                                ${this.addZero(timestamps.minutes)}:
                                ${this.addZero(timestamps.seconds)}:
                                ${this.addZero(timestamps.miliseconds)}
                             `}
                         </li>
                     ))}
                </List>
            </>
        )
    }
}

export default Chronometer;
