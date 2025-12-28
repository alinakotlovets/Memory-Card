import { useState, useEffect } from "react";
import loadingGif from "./images/spinning-dots.svg";
import "./GameBoard.css"
import Card from "./Card.jsx";
import { motion } from "motion/react"
import Form from "./Form.jsx";

async function getImg({setCards,  setLoading, cardNumbers}) {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${cardNumbers}&api_key=live_NAnCw6GKjqXr1ZPPf6vqd8PB6RV27ECzUxf50MVzkdpCBRyveYZbQ1RHJY2oZ4x2`);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        const imgArr = data.map(item => ({ id: item.id, url: item.url }));
        setCards((imgArr.map(card => ({id: card.id, url: card.url, clicked: false}))));
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
}

function GameBoard({selectedLevel, setSelectedLevel, score, setScore}){
    const cardNumbers = { easy: 6, medium: 12, hard: 18 }[selectedLevel];
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState({state:false, outcome:undefined});

    const onClick = (id) =>{
        const card = cards.find(card => card.id === id);
        if(card.clicked){
            setShowForm({state: true, outcome: "fail"});
        }

        let clickedCards = cards.map(card => card.id === id ? {...card, clicked: true} : card);
        let newCards = shuffle(clickedCards);
        let count = clickedCards.filter(card => card.clicked).length;

        setScore({score: count, bestScore: score.bestScore < count ? count : score.bestScore})
        if(count === cardNumbers){
            setShowForm({state: true, outcome: "win"});
        }
        setCards(newCards);
    }


    useEffect(() => {
        getImg({setCards, setLoading, cardNumbers});
    }, [cardNumbers]);


    const shuffle = (array) => {
        let newArr = [...array]
        let currentIndex = newArr.length;

        while (currentIndex !== 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [newArr[currentIndex], newArr[randomIndex]] = [
                newArr[randomIndex], newArr[currentIndex]];
        }

        return newArr;
    }


    return (
        <div>
            {loading ? (
                <div className="loading-container">
                <img src={loadingGif} alt="loading" />
                </div>
            ) : showForm.state ? (
                <>
                    <Form cards={cards} setCards={setCards} setSelectedLevel={setSelectedLevel} setShowForm={setShowForm} score={score} setScore={setScore} outcome={showForm.outcome}/>
                </>
                )
            :(
                <div>
                    <div className="flex-center">
                        <h2>Score: {score.score} </h2>
                        <h2>Best score: {score.bestScore}</h2>
                    </div>
                    <div className="card-box">
                     {cards.map(card => (
                          <motion.div key={card.id} layout>
                              <Card card={card} onClick={onClick} />
                          </motion.div>
                     ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameBoard;