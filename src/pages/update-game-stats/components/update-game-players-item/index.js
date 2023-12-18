import React, {useState} from 'react'
import c from './style.module.scss'
import {UpdateStatsPlayerBar} from "../update-stats-player-bar";
import {FlexBox} from "../../../../components/cruspher-ui/box/flexbox";
import {PlayerWithForm} from "../../../../components/items/player-with-form";
import {StarIcon} from "../../../../components/cruspher-ui/icons/default";
import {useIntl} from "react-intl";


const UpdateGamePlayersItem = ({player, maxValues, isTop, shopElements}) => {
  const intl = useIntl()
  const [isActive, setIsActive] = useState(false)
  const containerClass = isTop ? `${c.container} ${c.containerTop}` : c.container

  const toggleActive = () => setIsActive(!isActive)

  const body = isActive && (
    <div className={c.body}>
      {
        Object.keys(player.statistics).map(key => (
          <UpdateStatsPlayerBar key={'key'} title={key} value={player.statistics[key]} max={maxValues[key]}/>
        ))
      }
    </div>
  )

  const imageTest = player.avatar ? player.avatar : player.image


  return (
    <div className={c.wrap}>
      <div onClick={toggleActive} className={containerClass}>
        <FlexBox items='center' columnGap='10px'>
          <PlayerWithForm
            shopElements={shopElements}
            isGK={player.position.toLowerCase() === 'goalkeeper'}
            image={imageTest}
            width='80px'
            height='80px'
          />

          <FlexBox direction='column' rowGap='5px'>
            <h4 className={c.name}>
              {player.name + ' ' + player.surname}
            </h4>

            <FlexBox items='center' columnGap='5px'>
              <span className={c.number}>
                {player.number}
              </span>

              <span className={c.position}>
                {intl.formatMessage({id: player.position})}
              </span>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox items='center' columnGap='3px'>
          <StarIcon />

          <span className={c.rating}>
            {player.statistics.rating}
          </span>
        </FlexBox>
      </div>

      {body}
    </div>
  )
}


export {
  UpdateGamePlayersItem
}