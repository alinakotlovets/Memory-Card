function LevelSelect({setSelectedLevel}){

    return(
            <div>
                <button onClick={()=> setSelectedLevel("easy")}>Easy</button>
                <button onClick={()=> setSelectedLevel("medium")}>Medium</button>
                <button onClick={()=> setSelectedLevel("hard")}>Hard</button>
            </div>

    )
}

export default LevelSelect;