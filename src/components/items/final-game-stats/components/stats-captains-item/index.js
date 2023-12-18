import React from 'react'
import c from './style.module.scss'
import {PlayerWithForm} from "../../../player-with-form";
import {useIntl} from "react-intl";


const StatsCaptainsItem = ({player, title, shopElements}) => {
  const intl = useIntl()

  return (
    <div className={c.wrap}>
      <div className={c.titleWrap}>
        <span className={c.title}>{intl.formatMessage({id: title})}</span>
        <span className={c.rating}>+ {player.rating}</span>
      </div>

      <div className={c.container}>

        <PlayerWithForm
          shopElements={shopElements}
          image={player.avatar}
          width='210px'
          height='210px'
        />
      </div>
    </div>
  )
}

export {
  StatsCaptainsItem
}