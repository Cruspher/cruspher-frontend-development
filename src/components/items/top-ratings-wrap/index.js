import React, {useState} from 'react'
import c from './style.module.scss'
import {useIntl} from "react-intl";

const TopRatingsWrap = ({players, title}) => {
  const intl = useIntl()
  const [isActive, setIsActive] = useState(false)
  const toggleActive = () => setIsActive(!isActive)


  return (
    <div className={c.wrap}>
      <h3 className={c.title} onClick={toggleActive}>
        {intl.formatMessage({id: title})}
      </h3>
      {
        isActive && (
          <div className={c.body}>
            {
              players.map((player, index) => (
                <div key={Math.random().toString()} className={c.playerWrap}>
                  <span className={c.playerLeft}>
                    <span className={c.index}>
                      {index + 1}
                    </span>

                    <span>
                      {player.name}
                    </span>

                    <span>
                      {player.surname}
                    </span>
                  </span>

                  <span className={c.playerRight}>
                    {player[title]}
                  </span>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}


export {
  TopRatingsWrap
}