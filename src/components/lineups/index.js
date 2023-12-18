import React, {useRef} from 'react'
import c from './style.module.scss'
import {LineupsFormations} from "./components/lineups-formations";
import {LineupsArea} from "./components/lineups-area";
import {LineupsChooseModal} from "./components/lineups-choose-modal";


const Lineups = (
  {
    formationList,
    form,
    formation,
    setFormation,
    formationPage,
    setFormationPage,
    activePosition,
    setActivePositionHandler,
    removePlayerFormLineupHandler,
    captainsForm,
    setCaptainsForm,
    activePlayerItem,
    setActivePlayerItem,
    isLoading,
    players,
    setPlayerHandler,
    isDisabled,
    shopElements
  }
) => {
  const modalRef = useRef()
  const areaRef = useRef()
  const scrollToModal = () => {
    window.scrollTo({
      top: modalRef.current.offsetTop - 90,
      behavior: "smooth"
    });
  }
  const scrollToArea = () => {
    window.scrollTo({
      top: areaRef.current.offsetTop - 90,
      behavior: "smooth"
    });
  }


  const areaClass = isDisabled ? `${c.wrap} ${c.areaDisabled}` : c.wrap


  return (
    <div className={areaClass}>

      <div className={c.areaWrap} ref={areaRef}>

        {
          !isDisabled && (
            <LineupsFormations
              formationsData={formationList}
              setFormation={setFormation}
              formation={formation}
              setFormationPage={setFormationPage}
              page={formationPage}
            />
          )
        }

        <LineupsArea
          form={form}
          setActivePositionHandler={setActivePositionHandler}
          activePosition={activePosition}
          removeHandler={removePlayerFormLineupHandler}
          captainsForm={captainsForm}
          setCaptainsForm={setCaptainsForm}
          activePlayerItem={activePlayerItem}
          setActivePlayerItem={setActivePlayerItem}
          isLoading={isLoading}
          isDisabled={isDisabled}
          shopElements={shopElements}
          scrollToModal={scrollToModal}
        />
      </div>

      {
        !isDisabled && (
          <LineupsChooseModal
            players={players}
            activePosition={activePosition}
            setPlayerHandler={setPlayerHandler}
            form={form}
            modalRef={modalRef}
            scrollToArea={scrollToArea}
            shopElements={shopElements}
          />
        )
      }

    </div>
  )
}


export {
  Lineups
}