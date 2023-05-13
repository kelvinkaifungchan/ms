import { useState } from "react"
import { Tooltip } from "./Tooltip"
import { useTimer } from 'react-timer-hook'

const Countdown = () => {
    const {
        seconds,
        minutes,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => {setDone(true), setExpiryTimeStamp()}});

    const [input, setInput] = useState("10")
    const [expiryTimestamp, setExpiryTimeStamp] = useState()
    const [done, setDone] = useState(false)

    const handleInput = (e) => {
        if (expiryTimestamp) {
            return
        }
        else {
            setInput(e.target.value)
        }
    }

    const handleStart =(e) => {
        if (input.length > 0 && !isNaN(input) && !expiryTimestamp) {
            const expire = new Date()
            const add = input * 60
            expire.setSeconds(expire.getSeconds() + add)
            setExpiryTimeStamp(expire)
            restart(expire)
        }
    }
    return (
        <>
            <input className="text-8xl font-bold text-center w-full focus:outline-none" value={expiryTimestamp ? ((minutes.toString().length < 2 ? ("0" + minutes) : minutes) + ":" + (seconds.toString().length < 2 ? ("0" + seconds) : seconds)) : input} onChange={(e) => {handleInput(e)}} onKeyDown={(e) => {if (e.key === "Enter") {handleStart(e)}}}/>
            <div className="flex justify-center space-x-2">
                <div className="hover:bg-hl hover:cursor-pointer rounded p-1" onClick={(e) => {handleStart(e)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                </div>
                <div className="hover:bg-hl hover:cursor-pointer rounded p-1" onClick={() => {
                  const t = new Date();
                  t.setSeconds(t.getSeconds() + input * 60);
                  restart(t)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </div>
                <div className="hover:bg-hl hover:cursor-pointer rounded p-1" onClick={(e) => {setExpiryTimeStamp()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                    </svg>
                </div>
            </div>
        </>
    )
}

export const Timer = ({index, handleCloseTimer}) => {
    const [name, setName] = useState("Timer")
    
    const handleName = (e) => {
        setName(e.target.value)
    }

    return (
        <div className="h-full w-full rounded opacity-90 shadow-inset p-2">
            <div className="absolute right-2">
                <Tooltip tooltip={"Close Timer"} position={"-translate-x-20 translate-y-8"}>
                    <div className='p-1 hover:bg-hl rounded hover:cursor-pointer' onClick={(e) => {handleCloseTimer(index)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                </Tooltip>
            </div>
            <div className="flex items-center justify-center h-full w-full text-center">
                <div className="flex justify-center flex-col">
                    <input className="text-xl font-bold opacity-30 focus:outline-none w-full text-center" type="text" value={name} onChange={(e) => {handleName(e)}}/>
                    <Countdown/>
                </div>
            </div>
        </div>
    )
}