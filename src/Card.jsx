function Card({card, onClick}){
    return(
        <img src={card.url} alt="cat" onClick={()=> onClick(card.id)} />
    )
}

export default  Card;