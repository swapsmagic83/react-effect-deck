import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import Card from "./Card";
const BASE_URL ="https://deckofcardsapi.com/api/deck"  

const Deck = () =>{
    useEffect(()=>{
        async function getDeckId(){
            const res =await axios.get(`${BASE_URL}/new/shuffle`)
            console.log(res.data.deck_id)
            setDeckId(res.data.deck_id )    
        }
        getDeckId()
    },[])

    const [deckId,setDeckId] = useState(null)
    const [drawn,setDrawn] =useState([])
    const [remaining, setRemaining] = useState(52)

    async function getCard(){
        const res = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`)
        const card= res.data.cards[0]
        setDrawn(d =>[
            ...d,
            {
                code:card.code,
                image:card.image,
                name:card.suit+" "+card.value
            }])
        setRemaining(remaining-1)
        console.log(remaining)
        if(remaining===0){
            throw new Error("Deck empty!");
        }
    }
    async function shuffleDeck(){
        const res = await axios.get(`${BASE_URL}/${deckId}/shuffle`)
        console.log(res.data.remaining)
        setDrawn([])
        setRemaining(52)   
    }

    function showButton(){
        if(remaining===40){
            return <button onClick={shuffleDeck}>Shuffle Deck</button>
        }else{
            return <button onClick={getCard}>Give me card</button> 
        }
    }

    return (
        <>
        {showButton()}
        <div>
        {drawn.map(c=> (
            <Card  key={c.code} name={c.name} image={c.image} />
        ))}
        </div>
        </>
    )
}

export default Deck