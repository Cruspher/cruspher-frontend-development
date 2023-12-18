import React from 'react'
import c from './style.module.scss'
import {FlexBox} from "../../../../cruspher-ui/box/flexbox";
import {UpdateGameToShowResult} from "../../../update-game-to-show-result";


const GameItemBody = ({game}) => {

  return (
    <div className={c.body}>
      <FlexBox content='flex-end' items='center' columnGap='7px'>
          <img className={c.avatar} src={game.homeAvatar} alt=""/>
      </FlexBox>


      <div className={c.scoreSpan}>
        <UpdateGameToShowResult game={game}/>
      </div>

      <FlexBox content='flex=start' items='center' columnGap='7px'>
          <img className={c.avatar} src={game.awayAvatar} alt=""/>
      </FlexBox>
    </div>

  )
}


export {
  GameItemBody
}