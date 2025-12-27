import './App.css'
import {useState} from "react";
import LevelSelect from "./LevelSelect.jsx";
import GameBoard from "./GameBoard.jsx";

function App() {
    const [selectedLevel, setSelectedLevel] = useState(undefined);


    if(selectedLevel === undefined){
        return(
            <LevelSelect setSelectedLevel={setSelectedLevel} />
        )
    }
    if(selectedLevel){
        return (
                <GameBoard selectedLevel={selectedLevel} />
        )
    }
}

export default App
