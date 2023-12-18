import React from 'react'
import c from './style.module.scss'
import defaultPlayer from '../../../assets/image/emptyHead.png'

const PlayerWithForm = ({submit, shopElements, image, width, height, isGK}) => {
  const widthValue = width ? width : '100px'
  const heightValue = height ? height : '100px'

  const submitHandler = () => {
    if (!submit) return
    submit()
  }


  const formImage = isGK ? shopElements.goalkeeperForm : shopElements.playerForm

  return (
    <div className={c.item} style={{width: widthValue, height: heightValue}}>
      <img
        className={c.player}
        src={image ? process.env.REACT_APP_API_URL + image : defaultPlayer}
        alt="player with form"
        onClick={submitHandler}
      />

      <img onClick={submitHandler}  className={c.playersFormImage} src={process.env.REACT_APP_API_URL + formImage} alt=""/>
    </div>
  )
}


export {
  PlayerWithForm
}