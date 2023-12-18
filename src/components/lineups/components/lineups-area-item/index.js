import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {AiFillDelete, AiOutlineClose} from "react-icons/all";
import {PlayerWithForm} from "../../../items/player-with-form";
import {getWindowDimensions} from "../../../../helpers/window";


const LineupsAreaItem = (
  {
    setActivePositionHandler,
    item,
    removeHandler,
    captainsForm,
    setCaptainsForm,
    activePlayerItem,
    setActivePlayerItem,
    isDisabled,
    shopElements,
    scrollToModal
  }
) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const captainClass =
    captainsForm ?
      captainsForm[item.position.toLowerCase()] === item.id
        ? `${c.captain} ${c.activeCaptain}`
        : `${c.captain} ${c.captainAnimated}`
      : c.captainNone


  const closeMenuHandler = () => setActivePlayerItem(null)

  const submitHandler = !isDisabled
    ? !item.id ? () => {
      scrollToModal()
      setActivePositionHandler(item)
    } : () => {
      setActivePlayerItem(item.id)
    } : () => {
    }

  const deleteHandler = () => {
    setActivePlayerItem(null)
    removeHandler(item.role, item)
  }

  const setCaptainHandler = () => {
    if (!captainsForm) return
    const newForm = {...captainsForm}

    newForm[item.position] = item.id

    setCaptainsForm(newForm)
  }


  const menu = (
    <div className={c.menu}>
      <>
        {
          item.position !== 'goalkeeper' && captainsForm ? (
            <>
              {
                !(activePlayerItem === item.id) && !(captainsForm[item.position.toLowerCase()] === item.id) ? (
                  <></>
                ) : (
                  <div className={captainClass} onClick={setCaptainHandler}>
                    c
                  </div>
                )
              }
            </>
          ) : (
            <div className={c.emptyDiv}/>
          )
        }
      </>

      <div className={c.remove} onClick={deleteHandler}>
        <AiFillDelete/>
      </div>

      <div className={c.exit} onClick={closeMenuHandler}>
        <AiOutlineClose/>
      </div>
    </div>
  )
  return (
    <div
      style={{gridColumnStart: item.column, gridRowStart: item.row}}
      className={c.wrap}
    >
      {activePlayerItem === item.id && menu}
      {
        captainsForm && captainsForm[item.position.toLowerCase()] === item.id && item.position !== 'goalkeeper' && (
          <div className={c.captainView} onClick={setCaptainHandler}>
            c
          </div>
        )
      }

      <PlayerWithForm
        width={windowDimensions < 500 ? '55px' : '55px'}
        height={windowDimensions < 500 ? '50px' : '55px'}
        submit={submitHandler}
        shopElements={shopElements}
        image={item.avatar}
        isGK={item.position.toLowerCase() === 'goalkeeper'}
      />
    </div>
  )
}


export {
  LineupsAreaItem
}