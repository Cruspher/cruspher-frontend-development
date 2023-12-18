import React from 'react'
import c from "./style.module.scss";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import starIcon from '../../../assets/image/icons/star.png'

const RatingItem = ({user, userId}) => {
  const isUserActive = user.userId === userId
  const userClass = isUserActive ? `${c.item} ${c.active}` : c.item


  return (
    <>
      <div className={userClass}>
        <div className={c.leftSide}>
          <div className={c.ratingNumber}>{user.position}</div>
          <span className={c.name}>{`${user.name}`}</span>
        </div>
        <FlexBox items='center' columnGap='5px'>
          <img className={c.startIcon} src={starIcon} alt=""/>
          <span className={c.text}>
            {user.points.toFixed(1)}
          </span>
        </FlexBox>
      </div>
    </>
  )
}


export  {
  RatingItem
}
