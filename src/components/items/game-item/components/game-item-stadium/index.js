import React from 'react'
import c from './style.module.scss'

const GameItemStadium = ({game}) => {
  const stadiumName =
    game.stadium.length > 25
      ? game.stadium.split(' ').map(item => item[0].toUpperCase())
      : game.stadium

  return (
    <div className={c.wrap}>
      <h4>
        {stadiumName}
      </h4>
    </div>
  )
}


export {
  GameItemStadium
}