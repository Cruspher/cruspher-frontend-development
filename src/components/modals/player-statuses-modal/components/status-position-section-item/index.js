import React, {useState} from 'react'
import c from './style.module.scss'
import {PlayerWithForm} from "../../../../items/player-with-form";
import {
  AiTwotoneCreditCard,
  ImCheckboxChecked,
  MdOtherHouses,
  MdOutlineManageAccounts
} from "react-icons/all";


const GetIconByStatus = ({status}) => {
  if (status === 'ok') return (
    <ImCheckboxChecked className={c.ok} />
  )
  else if (status === 'other') return (
    <MdOtherHouses className={c.other} />
  )
  else if (status === 'card') return (
    <AiTwotoneCreditCard className={c.card} />
  )
  else if (status === 'sick') return (
    <MdOutlineManageAccounts className={c.sick} />
  )

  return (
    <MdOutlineManageAccounts className={c.ok} />
  )
}


const StatusPositionSectionItem = ({player, shopElements, changePlayerValue, disabled}) => {
  const [isActive, setIsActive] = useState(false)
  const statusClass = isActive ? `${c.status} ${c.statusActive}` : c.status

  const toggleIsActive = () => {
    if (isActive || disabled) return
    setIsActive(true)
  }

  const statusSubmitHandler = (val) => {
    changePlayerValue(player.id, val)
    setIsActive(false)
  }

  return (
    <div className={c.wrap}>
      {!isActive && (
        <span onClick={toggleIsActive} className={c.activeStatus}>
          <GetIconByStatus status={player.status} />
        </span>
      )}
      <div className={statusClass}>
        {isActive && (
          <>
            <div
              onClick={() => statusSubmitHandler('ok')}
              className={player.status === 'ok' && c.containerActive}
            >
              <ImCheckboxChecked className={c.ok} />
            </div>
            <div
              onClick={() => statusSubmitHandler('other')}
              className={player.status === 'other' && c.containerActive}
            >
              <MdOtherHouses className={c.other} />
            </div>
            <div
              onClick={() => statusSubmitHandler('card')}
              className={player.status === 'card' && c.containerActive}
            >
              <AiTwotoneCreditCard className={c.card} />
            </div>
            <div
              onClick={() => statusSubmitHandler('sick')}
              className={player.status === 'sick' && c.containerActive}
            >
              <MdOutlineManageAccounts className={c.sick} />
            </div>
          </>
        )}
      </div>
      <PlayerWithForm
        shopElements={shopElements}
        image={player.image}
        isGK={player.position === 'goalkeeper'}
        width='80px'
        height='80px'
      />
    </div>
  )
}


export {
  StatusPositionSectionItem
}