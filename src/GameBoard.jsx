import { useState, useEffect } from "react";
import loadingGif from "./images/spinning-dots.svg";
import "./GameBoard.css"
import Card from "./Card.jsx";

function GameBoard({selectedLevel}){
    const cardNumbers = { easy: 6, medium: 12, hard: 20 }[selectedLevel];
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const[clicked, setClicked] = useState([]);

    const onClick = (id) =>{
        setClicked(clicked.map(item => item.id === id ? {...item, clicked: true} : item));
    }

    useEffect(() => {
        console.log(clicked);
    }, [clicked])

    useEffect(() => {
        async function getImg() {
            try {
                const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${cardNumbers}&api_key=live_NAnCw6GKjqXr1ZPPf6vqd8PB6RV27ECzUxf50MVzkdpCBRyveYZbQ1RHJY2oZ4x2`);
                if (!response.ok) throw new Error(response.status);
                const data = await response.json();
                const imgArr = data.map(item => ({ id: item.id, url: item.url }));
                setCards(imgArr);
                setClicked(imgArr.map(card => ({id: card.id, clicked: false})))
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        getImg();
    }, [cardNumbers]);



    return (
        <div>
            {loading ? (
                <img src={loadingGif} alt="loading" />
            ) : (
                cards.map(card => <Card key={card.id} card={card} onClick={onClick}/>)
            )}
        </div>
    )
}

export default GameBoard;