import React, { useState, useEffect } from "react"
import Timer from "react-compound-timerv2"
import { storeDataLS } from "../../utils/helpers"
import { usePopup } from "../../contexts/PopupContext"
import { useHintSolution } from "../../contexts/HintSolutionContext"
import { useCard } from "../../contexts/CardContext"

export default function Backward({ setIsForward, isPenalty }) {
    const { content } = usePopup()
    const { setHintSolution } = useHintSolution()
    const { card } = useCard()
    const [ count, setCount ] = useState(0)
    const [ storeTime, setStoreTime ] = useState(false)
    const [ updateTime, setUpdateTime ] = useState(false)

    useEffect(() => {
        let interval = null
        interval = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [count])

    useEffect(() => {
        setStoreTime(true)
        // setUpdateTime(false)
        const timeEl = document.getElementById("backward-time")
        if (storeTime) {
            storeDataLS("backward-time", timeEl.innerHTML)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    useEffect(() => {
        const timeEl = document.getElementById("backward-time")
        const backwardTime = timeEl.innerHTML
        setStoreTime(true)
        setUpdateTime(true)
        const stopBtn = document.querySelector(".stop-btn")
        if (storeTime && updateTime && content.isHint) {
            stopBtn.click()
            const temp = Math.floor(Math.abs(Number(backwardTime) - (30 * 1000)))
            backwardTime < 30000
            ? setHintSolution({ 
                isOpen: true, 
                isHint: true, 
                text: card.hint,
                key: "backward-time",
                time: "50"
            })
            : setHintSolution({ 
                isOpen: true, 
                isHint: true, 
                text: card.hint,
                key: "backward-time",
                time: String(temp)
            })
        } else if (storeTime && updateTime && content.isSolution) {
            stopBtn.click()
            const temp = Math.floor(Math.abs(Number(backwardTime) - (60 * 1000)))
            backwardTime < 60000 
            ? setHintSolution({ 
                isOpen: true, 
                isHint: true,
                isSolution: false, 
                text: card.solution,
                key: "backward-time",
                time: "50"
            })
            : setHintSolution({ 
                isOpen: true, 
                isHint: false, 
                isSolution: true,
                text: card.solution,
                key: "backward-time",
                time: String(temp)
            })
        }

        if (storeTime && isPenalty) {
            stopBtn.click()
            const temp = Math.floor(Math.abs(Number(backwardTime) - (60 * 1000)))
            backwardTime < 60000 
            ? storeDataLS("backward-time", "50") 
            : storeDataLS("backward-time", String(temp))
            window.location.reload(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, updateTime])

    useEffect(() => {
        setStoreTime(false)
        setUpdateTime(false)
    }, [])

    return (
        <div className="timer">
            <Timer
                initialTime={1000 * 60 * 60} 
                direction="backward"
                checkpoints={[
                    {
                        time: 0,
                        callback: () => setIsForward(true),
                    }
                ]}
            >
                {({ getTime, stop }) => (
                    <>
                        <p id="backward-time">{getTime()}</p>
                        <button className="stop-btn" onClick={stop}>Stop</button>
                        <Timer.Minutes formatValue={value => value === 0 ? "00" : value < 10 ? `0${value}` : value} />
                        <span> : </span>
                        <Timer.Seconds formatValue={value => value === 0 ? "00" : value < 10 ? `0${value}` : value} />
                    </>
                )}
            </Timer>
        </div>
    )
}
