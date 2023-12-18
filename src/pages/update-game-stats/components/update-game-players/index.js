import React from 'react'
import {UpdateGamePlayersItem} from "../update-game-players-item";
import c from './style.module.scss'


const UpdateGamePlayers = ({players, maxValues, shopElements}) => {

  return (
    <div className={c.wrap}>
      {
        players.map((player, index) => (
          <UpdateGamePlayersItem
            isTop={index < 3}
            key={player.id}
            player={player}
            maxValues={maxValues}
            shopElements={shopElements}
          />
        ))
      }
    </div>
  )
}


export {
  UpdateGamePlayers
}