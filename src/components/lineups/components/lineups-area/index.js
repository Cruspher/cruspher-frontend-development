import React from 'react'
import c from './style.module.scss'
import {LineupsAreaItem} from "../lineups-area-item";
import {Loading} from "../../../cruspher-ui/loading";


const LineupsArea = (
  {
    setActivePositionHandler,
    form,
    activePosition,
    removeHandler,
    captainsForm,
    setCaptainsForm,
    activePlayerItem,
    setActivePlayerItem,
    isLoading,
    isDisabled,
    shopElements,
    scrollToModal
  }
) => {
  const data = form ? Object.keys(form).map(key => form[key]) : []

  const body = isLoading ? (
    <Loading/>
  ) : (
    <div>
      <img className={c.dec} src={process.env.REACT_APP_API_URL + shopElements.stadium} alt=""/>
      <div className={c.area}>
        {
          data.map(item => (
              <LineupsAreaItem
                key={Math.random().toString()}
                removeHandler={removeHandler}
                item={item}
                setActivePositionHandler={setActivePositionHandler}
                activePosition={activePosition}
                captainsForm={captainsForm}
                setCaptainsForm={setCaptainsForm}
                activePlayerItem={activePlayerItem}
                setActivePlayerItem={setActivePlayerItem}
                isDisabled={isDisabled}
                shopElements={shopElements}
                scrollToModal={scrollToModal}
              />
            )
          )
        }
      </div>
    </div>
  )


  return (
    <>
      {body}
    </>
  )
}


export {
  LineupsArea
}