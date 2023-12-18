import React from "react"
import {GameItemBody} from "./components/game-item-body";
import c from './style.module.scss'
import {GameItemAbout} from "./components/game-item-about";
import {useNavigate} from "react-router-dom";
import {GameItemStadium} from "./components/game-item-stadium";


const GameItem = ({ game, link}) => {
  const navigate = useNavigate()
  const viewGameHandler = () => {
    navigate(link + game.id)
  }

  return (
    <div className={c.wrap} onClick={viewGameHandler}>
      <GameItemAbout game={game} />

      <GameItemBody game={game} />

        <GameItemStadium game={game}/>
    </div>
  )
}

export  {
  GameItem
}
