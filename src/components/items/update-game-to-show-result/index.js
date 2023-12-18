import React from 'react';
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import c from './style.module.scss'

export const UpdateGameToShowResult = ({game}) => {
  let colors = {}

  if (Number.isInteger(game.homeScore)) {

    if (game.homeScore > game.awayScore) {
      colors = {
        homeColor: '#45ba22',
        awayColor: '#f52f2f'
      }
    } else if (game.awayScore > game.homeScore) {
      colors = {
        homeColor: '#f52f2f',
        awayColor: '#45ba22'
      }
    } else {
      colors = {
        homeColor: '#3da2f5',
        awayColor: '#3da2f5'
      }
    }
  }


  return (
    <FlexBox items='center' content='center' columnGap='7px'>
      {Number.isInteger(game.homeScore) && <span className={c.span} style={{color: colors.homeColor}}>{game.homeScore}</span>}
      <FlexBox columnGap='7px'>
        <span>-</span>
      </FlexBox>
      {Number.isInteger(game.awayScore) && <span className={c.span} style={{color: colors.awayColor}}>{game.awayScore}</span>}
    </FlexBox>
  )
}
