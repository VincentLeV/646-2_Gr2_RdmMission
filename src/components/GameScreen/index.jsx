import React, { useState, useEffect } from "react"
import { useImgSrc } from "../../contexts/ImgSrcContext"
import CardsInDeck from "../CardsInDeck"
import CardContainer from "../CardContainer"
import CardsDiscarded from "../CardsDiscarded"
import cards from "../../constants/cards"
import MinimizedCardContainer from "../MinimizedCardContainer"

export default function GameScreen({ setIsPenalty }) {
    const [ numberToBeFound, setNumberToBeFound ] = useState("synopsis")
    const [ discardedNumberToBeFound, setDiscardedNumberToBeFound] = useState("")
    const [ discardedList, setDiscardedList] = useState([])
    const { imgSrc, setImgSrc } = useImgSrc()
    const [ minimizedImgSrc, setMinimizedImgSrc ] = useState([])

    useEffect(() => {
        const card = cards.find(c => String(c.number) === numberToBeFound.toLowerCase())
        if (card) {
            card.hint === "Carte pénalité" || card.solution === "Carte pénalité"
            ? setIsPenalty(true)
            : setIsPenalty(false)
        } else {
            setIsPenalty(false)
        }
    }, [numberToBeFound, setIsPenalty])

    return (
        <div>
            <div className="minimizedCards">
                <MinimizedCardContainer
                    minimizedImgSrc={minimizedImgSrc}
                    setMinimizedImgSrc={setMinimizedImgSrc}
                    discardedList={discardedList}
                    setDiscardedList={setDiscardedList}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                />
            </div>

            <div id="game-screen">
            <CardsInDeck
                numberToBeFound={numberToBeFound}
                setNumberToBeFound={setNumberToBeFound}
            />

            <div className="cards">
                <CardContainer 
                    numberToBeFound={numberToBeFound} 
                    discardedNumberToBeFound={discardedNumberToBeFound}
                    discardedList={discardedList}
                    setDiscardedList={setDiscardedList}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    minimizedImgSrc={minimizedImgSrc}
                    setMinimizedImgSrc={setMinimizedImgSrc}
                />
            </div>

            <CardsDiscarded 
                discardedNumberToBeFound={discardedNumberToBeFound} 
                setDiscardedNumberToBeFound={setDiscardedNumberToBeFound}
                discardedList={discardedList}
                setDiscardedList={setDiscardedList}
                imgSrc={imgSrc}
                setImgSrc={setImgSrc}
            />
            </div>
        </div>
    )
}
