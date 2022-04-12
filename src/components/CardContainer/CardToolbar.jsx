import React from "react"
import { HiOutlineLightBulb } from "react-icons/hi"
import { GiMagnifyingGlass } from "react-icons/gi"
import { HiOutlineX } from 'react-icons/hi'
import { Tooltip } from "@mui/material"
import { usePopup } from "../../contexts/PopupContext"
import { useCard } from "../../contexts/CardContext"
import cards from "../../constants/cards"
import { storeDataLS } from "../../utils/helpers"
//import { useDiscarded } from "../../contexts/DiscardedContext"

export default function CardToolbar({ source, discardedList, setDiscardedList }) {
    const { setContent } = usePopup()
    const { setCard } = useCard()    
//    const { setDiscarded } = useDiscarded()

    const showHint = () => {
        setContent({ isOpen: true, msg: "Showing hint costs 30 seconds of your time are you sure to continue?" })
        const selected = source?.split("/")[3]?.split(".")[0]
        const card = cards?.find(x => `card${x?.number}` === selected?.toLowerCase())
        setCard(card)
    }

    const showSolution = () => {
        setContent({ isOpen: true, msg: "Showing solution costs 1 minute of your time are you sure to continue?" })
        const selected = source?.split("/")[3]?.split(".")[0]
        const card = cards?.find(x => `card${x?.number}` === selected?.toLowerCase())
        setCard(card)
    }

    const discardCard = () => {
        const selected = (source?.split("/")[3]?.split(".")[0]).toLowerCase()
        const cardIndex = cards?.findIndex((num => `card${num?.number}` === selected))
        // console.log("cardindex" + cardIndex)
        if (cards && cardIndex) {
            cards[cardIndex].isDiscarded = true
        }

        setDiscardedList([ ...discardedList, cards[cardIndex] ])    
        storeDataLS("discarded-cards", [...new Set([ ...discardedList, cards[cardIndex] ])])
        // console.log(cards[cardIndex].isDiscarded)
        // console.log("cards" + cards[cardIndex].isDiscarded)

        document.getElementById(source?.split("/")[3]?.split(".")[0]).style.visibility='hidden'
        
    }

    return (
        <section className="card-toolbar">
            <Tooltip title="Hint">
                <button onClick={showHint}>
                    <GiMagnifyingGlass />
                </button>
            </Tooltip>
            <Tooltip title="Solution">
                <button onClick={showSolution}>
                    <HiOutlineLightBulb />
                </button>
            </Tooltip>
            <Tooltip title="Close">
                <button onClick={discardCard}>
                    <HiOutlineX />
                </button>
            </Tooltip>
        </section>
    )
}