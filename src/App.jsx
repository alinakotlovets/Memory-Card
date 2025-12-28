import './App.css'
import {useState} from "react";
import LevelSelect from "./LevelSelect.jsx";
import GameBoard from "./GameBoard.jsx";

function App() {
    const [selectedLevel, setSelectedLevel] = useState(undefined);
    const [score, setScore] = useState({score:0, bestScore:0});

    return (
        <>
            <h1>Memory game</h1>
            {selectedLevel === undefined ?
                (<LevelSelect setSelectedLevel={setSelectedLevel} />)
                : (  <GameBoard selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} score={score} setScore={setScore} />)

            }
        </>
    )

}

export default App
