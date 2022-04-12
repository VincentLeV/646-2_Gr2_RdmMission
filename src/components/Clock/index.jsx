import React, { useState, useEffect } from "react"
import { getDataLS } from "../../utils/helpers"

import ForwardContainer from "./ForwardContainer"
import BackwardContainer from "./BackwardContainer"

export default function Clock({ isForward, setIsForward }) {
    const [ initialBTime, setInitialBTime ] = useState(null)
    const [ initialFTime, setInitialFTime ] = useState(null)

    useEffect(() => {
        const currentBackwardTime = getDataLS("backward-time")
        if (currentBackwardTime) {
            setInitialBTime(currentBackwardTime)
        }
    }, [])

    useEffect(() => {
        const currentForwardTime = getDataLS("forward-time")
        if (isForward) {
            if (currentForwardTime) {
                setInitialFTime(currentForwardTime)
            }
        }
    }, [isForward])

    return (
        <div>
            {
                isForward
                ? <ForwardContainer initialFTime={initialFTime} setIsForward={setIsForward} />
                : <BackwardContainer initialBTime={initialBTime} setIsForward={setIsForward} />
            }
        </div>
    )
}