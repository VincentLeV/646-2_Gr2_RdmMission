import React, { useState, useEffect } from "react"
import cards from "../../constants/cards"

export default function CardList({ numberToBeFound }) {
    const [ cardFound, setCardFound ] = useState(null)
    const [ notFoundTxt, setNotFoundTxt ] = useState(null)

    useEffect(() => {
        if (cards) {
            const found = cards.find(x => String(x.number) === numberToBeFound.replace(/\s/g, "").toLowerCase())

            if (found) {
                if (found.isDiscarded) {
                    setNotFoundTxt("")
                    setCardFound(null)
                } else {
                    setCardFound(found)
                }   
            } else {
                setCardFound(null)
                numberToBeFound
                ? setNotFoundTxt("Ce numéro est incorrect ou ne correspond pas à cette étape, entrez un autre numéro !")
                : setNotFoundTxt("")
            }
        }
        
    }, [numberToBeFound])

    return (
        <div>
            <h4>Cartes dans la pioche (Cards in Deck)</h4>
            <p>{cardFound && cardFound.number}</p>
            <p>{notFoundTxt}</p>
        </div>
    )
}