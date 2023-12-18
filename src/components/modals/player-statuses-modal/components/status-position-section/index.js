import React from 'react'
import c from './style.module.scss'
import {GridBox} from "../../../../cruspher-ui/box/grid-box";
import {StatusPositionSectionItem} from "../status-position-section-item";
import {Title} from "../../../../cruspher-ui/title";


const StatusPositionSection = ({players, position, shopElements, changePlayerValue, isMissedList, title, disabled}) => {

  const playersSorted = isMissedList
    ? players.filter(player => player.status !== 'ok')
    : players.filter(player => {
    return player.position.toLowerCase() === position && player.status === 'ok'
  })

  return (
    <GridBox rowGap='10px'>
      <Title variant='h2'>
        {title}
      </Title>

      <div className={c.wrap}>
        {playersSorted.map(player => (
          <StatusPositionSectionItem
            changePlayerValue={changePlayerValue}
            player={player}
            key={player.id}
            shopElements={shopElements}
            disabled={disabled}
          />
          ))}
      </div>
    </GridBox>
  )
}


export {
  StatusPositionSection
}