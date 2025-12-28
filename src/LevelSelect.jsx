function LevelSelect({setSelectedLevel}){

    return(
            <div className="flex-center">
                <button className="grey-bnt" onClick={()=> setSelectedLevel("easy")}>Easy</button>
                <button className="blue-btn" onClick={()=> setSelectedLevel("medium")}>Medium</button>
                <button className="red-btn" onClick={()=> setSelectedLevel("hard")}>Hard</button>
            </div>

    )
}

export default LevelSelect;