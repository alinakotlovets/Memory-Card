function Form({cards, setCards, setSelectedLevel, setShowForm, score, setScore, outcome}){
    const message = outcome === "fail" ? "Game Over! 💀" : "You Win! 🎉";

    const playAgain = () =>{
        let newCards = cards.map((card) =>({...card, clicked: false }));
        setCards(newCards);
        setShowForm({state:false, outcome:undefined});
        setScore({score: 0, bestScore: score.bestScore })
    }

    const quit = () =>{
        setSelectedLevel(undefined);
        setShowForm({state:false, outcome:undefined});
        setScore({score: 0, bestScore:  score.bestScore })
    }

    return(
        <div className="form">
        <h2>{message}</h2>
            <div className="flex-center">
                <button className="grey-bnt" onClick={playAgain}>Play again</button>
                <button className="red-btn" onClick={quit}>Quit</button>
            </div>
        </div>
    )
}

export default Form;