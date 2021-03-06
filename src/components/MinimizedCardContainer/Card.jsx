import React, { useRef, useState } from "react"
import Draggable from "react-draggable"

import CardToolbar from "./CardToolbar"

export default function Card({ source, discardedList, setDiscardedList, imgSrc, setImgSrc, minimizedImgSrc, setMinimizedImgSrc }) {
    const [ position, setPosition ] = useState({ x: 0, y: 0 })

    const cardRef = useRef(null)

    const cardPosition = useRef({
        position: "absolute",
        top: Math.floor(Math.random() * 50 ),
    });

    const handleDrag = (_, ui) => {
        cardRef.current.classList.add("moving")
        setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY })
    }

    return (
        <Draggable
            nodeRef={cardRef}
            onDrag={handleDrag}
        >
            <div 
                id={source?.split("/")[3]?.split(".")[0].toLowerCase()}
                ref={cardRef}
                className="minimizedCard"
                style={!source.includes("synopsis") && cardPosition.current}
            >
                {!source.includes("synopsis") && <CardToolbar source={source} discardedList={discardedList} setDiscardedList={setDiscardedList} imgSrc={imgSrc} setImgSrc={setImgSrc} minimizedImgSrc={minimizedImgSrc} setMinimizedImgSrc={setMinimizedImgSrc}/>}
                
                <img 
                    src={source} 
                    alt="Card" 
                    width={300}
                    height={200}
                />
            </div>
        </Draggable>
    )
}
