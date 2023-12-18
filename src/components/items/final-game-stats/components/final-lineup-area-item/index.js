import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {PlayerWithForm} from "../../../player-with-form";
import {getWindowDimensions} from "../../../../../helpers/window";




const FinalLineupAreaItem = ({player, isRate, shopElements}) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div
      style={{gridColumnStart: player.column, gridRowStart: player.row}}
      className={c.wrap}
    >
      {
        isRate && player.isTrue && (
          <div className={c.plus}>
            +
          </div>
        )
      }
      {!isRate && <div className={c.rating}>{player.rating}</div>}
      <PlayerWithForm
        shopElements={shopElements}
        image={player.avatar}
        width={windowDimensions < 500 ? '50px' : '55px'}
        height={windowDimensions < 500 ? '50px' : '55px'}
        isGK={player.position.toLowerCase() === 'goalkeeper'}
      />
    </div>
  )
}


export {
  FinalLineupAreaItem
}