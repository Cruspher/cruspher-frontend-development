import React from "react";
import c from './style.module.scss'
import {AiOutlineCloseCircle} from "react-icons/all";

const Modal = ({children, toggleModal, maxWidth}) => {

  const exitHandler = (e) => {
    if (e.target.id === 'modal-elem') toggleModal()
  }

  return (
      <div className={c.wrap} id='modal-elem' onClick={exitHandler}>
        <AiOutlineCloseCircle onClick={toggleModal} className={c.close} />
        <div className={c.modal} style={{maxWidth: maxWidth ? maxWidth : '1200px'}}>
            {children}
          </div>
      </div>
  )
}


export {
  Modal
}
