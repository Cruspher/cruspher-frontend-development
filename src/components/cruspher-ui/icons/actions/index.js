import React from 'react';
import c from './style.module.scss'
import {AiOutlineClear, FaClipboardList, IoPlayBack} from "react-icons/all";

const ClearIcon = ({submit}) => {

  return (
    <AiOutlineClear onClick={submit} className={`${c.icon} ${c.clearIcon}`} />
  )
}

const StatusIcon = ({submit}) => {

  return (
    <FaClipboardList onClick={submit} className={`${c.icon} ${c.statusIcon}`} />
  )
}

const BackIcon = ({submit}) => {

  return (
    <IoPlayBack onClick={submit} className={`${c.icon} ${c.backIcon}`} />
  )
}


export {
  ClearIcon,
  StatusIcon,
  BackIcon
}