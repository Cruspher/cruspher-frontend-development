import React, {useEffect} from 'react'
import CircleType from "circletype";
import {useIntl} from "react-intl";
import emptyAvatar from './empty-avatar.png'
import c from './style.module.scss'

const AdminListPlayerItem = ({player, infoSubmit, submit, submitTitle, shopElements}) => {
  const intl = useIntl()

  useEffect(() => {
    const collection = document.getElementsByClassName('player-name-title')
    const arr = Array.prototype.slice.call( collection )

    arr.forEach((item, i) => {
      const title = new CircleType(item);

      title.dir(-1).radius(200);
    })
  }, [])

  const position = player.position
  const image = player.image ? `${process.env.REACT_APP_API_URL}${player.image}` : emptyAvatar
  const name = player.name && player.surname ? `${player.name} ${player.surname}` : player.nameAPI

  const formImage = player.position.toLowerCase() === 'goalkeeper' ? shopElements.goalkeeperForm : shopElements.playerForm

  return (
    <div className={c.container}>
      <div className={c.header}>
        <span className={c.number}>{player.number}</span>

        <span className={c.position}>
          {intl.formatMessage({id: position})}
        </span>
      </div>

      <div className={c.imageContainer}>
        <img alt='alt' src={image} />
        <img className={c.formImage} src={process.env.REACT_APP_API_URL + formImage} alt="form"/>
        <h3 className={`${c.playerName} player-name-title`}>{name}</h3>
      </div>

      <div className={c.footer}>
        <button onClick={() => submit(player)} className={c.edit}>
          {submitTitle}
        </button>
      </div>
    </div>
  )
}

export {AdminListPlayerItem}
