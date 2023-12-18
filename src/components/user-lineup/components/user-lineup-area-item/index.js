import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {PlayerWithForm} from "../../../items/player-with-form";
import {getWindowDimensions} from "../../../../helpers/window";


const UserLineupAreaItem = (
  {
    item,
    shopElements
  }
) => {
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
      style={{gridColumnStart: item.column, gridRowStart: item.row}}
      className={c.wrap}
    >
      <PlayerWithForm
        width={windowDimensions < 500 ? '55px' : '55px' }
        height={windowDimensions < 500 ? '50px' : '55px'}
        submit={() => {}}
        shopElements={shopElements}
        isGK={item.position.toLowerCase() === 'goalkeeper'}
      />
      <div className={c.dec} />
    </div>
  )
}


export {
  UserLineupAreaItem
}