import React from 'react'
import c from './style.module.scss'
import {AiFillDislike, AiFillLike} from "react-icons/all";
import {FlexBox} from "../../box/flexbox";



const Like = ({submit, count}) => {
  const submitHandler = submit ? submit : () => {return null}
  const countValue = Number.isInteger(count) ? count : <></>

  return (
    <FlexBox items='center' columnGap='3px'>
      <AiFillLike onClick={submitHandler} className={`${c.icon} ${c.iconLike}`} />
      <span className={c.count}>
        {countValue}
      </span>
    </FlexBox>
  )
}

const Dislike = ({submit, count}) => {
  const submitHandler = submit ? submit : () => {return null}
  const countValue = Number.isInteger(count) ? count : <></>

  return (
    <FlexBox items='center' columnGap='3px'>
      <AiFillDislike onClick={submitHandler} className={`${c.icon} ${c.iconDislike}`} />
      <span className={c.count}>
        {countValue}
      </span>
    </FlexBox>
  )
}


export {
  Like,
  Dislike
}