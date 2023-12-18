import React from 'react'
import  c from './style.module.scss'
import stadiumImage from '../../../../assets/image/icons/stadium.png'
import calendarImage from '../../../../assets/image/icons/calendar.png'
import starImage from '../../../../assets/image/icons/star.png'
import reportImage from '../../../../assets/image/icons/comment.svg'
import editImage from '../../../../assets/image/icons/edit.svg'
import removeImage from '../../../../assets/image/icons/trash.svg'
import coinImage from '../../../../assets/image/icons/coins.png'
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineRight
} from "react-icons/all";




const StadiumIcon = () => {

  return (
    <img src={stadiumImage} alt=""/>
  )
}

const CalendarIcon = () => {

  return (
    <img src={calendarImage} alt=""/>
  )
}


const StarIcon = () => {

  return (
    <img  src={starImage} alt=""/>
  )
}

const CoinIcon = () => {

  return (
    <img  src={coinImage} alt=""/>
  )
}

const ReportIcon = ({submit}) => {

  return (
    <img className={c.icon} onClick={submit} src={reportImage} alt=""/>
  )
}

const EditIcon = ({submit}) => {

  return (
    <img className={c.icon} onClick={submit} src={editImage} alt=""/>
  )
}

const RemoveIcon = ({submit}) => {

  return (
    <img className={c.icon} onClick={submit} src={removeImage} alt=""/>
  )
}





const GetActionTypeIcon = ({type}) => {
  if (type === 'right') return <AiOutlineRight size={14} />
  if (type === 'left') return <AiOutlineLeft size={14} />
  if (type === 'add') return <AiOutlinePlus size={14} />
  if (type === 'remove') return <AiOutlineMinus size={14} />

  return  <></>
}

const ActionIcon = ({submit, type, isRed}) => {
  const actionCircleClass = isRed ? `${c.actionCircle} ${c.actionCircleRed}` : c.actionCircle
  const submitHandler = () => {
    if (!submit) return
    submit()
  }

  return (
    <div onClick={submitHandler} className={actionCircleClass}>
      <GetActionTypeIcon type={type} />
    </div>
  )
}


export {
  StadiumIcon,
  CalendarIcon,
  ActionIcon,
  StarIcon,
  ReportIcon,
  EditIcon,
  RemoveIcon,
  CoinIcon
}