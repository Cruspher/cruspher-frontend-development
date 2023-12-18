import React, {useEffect, useState} from "react";
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {PlayerWithForm} from "../player-with-form";


const getClassByItemLevel = (level) => {
  if (level === 1) {
    return c.wrapActiveGreen
  } else if (level === 2) {
    return c.wrapActiveBlue
  } else if (level === 3) {
    return c.wrapActiveViolet
  }

  return c.wrapActiveGreen
}

const BoxFleshItem = ({item}) => {
  const intl = useIntl()
  const [isActive, setIsActive] = useState(false)
  const wrapClass = isActive ? `${c.wrap} ${getClassByItemLevel(item.level)}` : c.wrap

  useEffect(() => {
    setIsActive(true)
  }, [])

  return (
    <div className={wrapClass}>
      <h2 className={c.title}>{intl.formatMessage({id: 'congratulations'})}</h2>

      {
        item.type === 'stadium' ? (
          <img className={c.stadium} src={process.env.REACT_APP_API_URL + item.image} alt="stadium"/>
        ) : (
          <div style={{opacity: isActive ? 1 : 0}} className={c.boxValue}>
            <PlayerWithForm width='300px' height='300px' shopElements={{playerForm: item.image}}/>
          </div>
        )
      }

      <span className={c.name}>{intl.formatMessage({id: item.type})}</span>
    </div>
  )
}

export {
  BoxFleshItem
}