import React from 'react'
import c from './style.module.scss'
import defaultPlayer from '../../../assets/image/emptyHead.png'

const ViewUniform = ({uniform, width, height}) => {
  const widthValue = width ? width : '100px'
  const heightValue = height ? height : '100px'

  return (
    <div className={c.item} style={{width: widthValue, height: heightValue}}>
      <img
        className={c.player}
        src={defaultPlayer}
        alt="player with form"
      />

      <img className={c.playersFormImage} src={process.env.REACT_APP_API_URL + uniform} alt=""/>
    </div>
  )
}


export {
  ViewUniform
}