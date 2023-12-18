import React from 'react'
import c from './style.module.scss'
import moment from "moment";

const GameItemAbout = ({game}) => {

  return (
    <div className={c.wrap}>
      <h3>
          {
              /*
                <span className={c.league}>
                  {game.league}
                </span>
               */
          }

        <span className={c.date}>
          {moment(game.date).format('LL')}
        </span>
      </h3>


    </div>
  )
}


export {
  GameItemAbout
}