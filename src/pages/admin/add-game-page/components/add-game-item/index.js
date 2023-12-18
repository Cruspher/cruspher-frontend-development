import React from 'react'
import c from './style.module.scss'
import moment from "moment/moment";

const AddGameItem = ({game, addGameHandler}) => {
    const isActive = !(game.status.toLowerCase() === 'time to be defined')
    const gameClass = !isActive ? c.game : `${c.game} ${c.gameActive}`
    const submitHandler = isActive ? () => {
        addGameHandler(game)
    } : () => {}

    return (
        <div className={gameClass} onClick={submitHandler}>
            <div className={c.name}>
                <img src={game.homeAvatar} alt=""/>
                {game.home} - {game.away}
                <img src={game.awayAvatar} alt=""/>
            </div>
            <div className={c.league}>
                {game.league}
            </div>
            <div className={c.date}>
                {moment(game.date).format("DD/MM/YYYY H:mm")}
            </div>
        </div>
    )
}


export {
    AddGameItem
}