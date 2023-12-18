import React, {useState} from 'react'
import c from './style.module.scss'
import {BsCheckLg} from "react-icons/all";
import {useIntl} from "react-intl";
import {PlayerWithForm} from "../../../items/player-with-form";
import {GridBox} from "../../../cruspher-ui/box/grid-box";
import {FlexBox} from "../../../cruspher-ui/box/flexbox";

const LineupsChooseModal = ({
                              players, setPlayerHandler, activePosition, form, modalRef, scrollToArea, shopElements
                            }) => {
  const intl = useIntl()
  const [isHaveFilter, setIsHaveFilter] = useState(true)
  const toggleFilter = () => setIsHaveFilter(!isHaveFilter)

  const filterClass = !isHaveFilter ? c.filter : `${c.filter} ${c.filterActive}`
  const wrapClass = activePosition ? c.wrap : `${c.wrapDisabled}`

  const chosenPlayers = []
  form && Object.keys(form).forEach(item => {
    if (form[item].id) chosenPlayers.push(form[item].id)
  })

  const playersToChose = isHaveFilter ? players.filter(player => {
    return player.position.toLowerCase() === activePosition.position && !chosenPlayers.includes(player.id)
  }) : players.filter(player => {
    return !chosenPlayers.includes(player.id)
  })

  const check = isHaveFilter && (<span className={c.check}>
      <BsCheckLg/>
    </span>)


  return (<div className={wrapClass} ref={modalRef}>
      {activePosition ? (<>
          <h3 className={c.header}>
        <span>
          {activePosition.role}
        </span>

            <span className={filterClass} onClick={toggleFilter}>
          {check}
              {intl.formatMessage({id: "filter"})}
        </span>
          </h3>

          <div className={c.container}>
            {playersToChose.map(player => (<div
                key={Math.random().toString()}
                onClick={() => {
                  scrollToArea()
                  setPlayerHandler(player, activePosition.role)
                }}
                className={c.item}
              >
                <PlayerWithForm
                  shopElements={shopElements}
                  isGK={player.position.toLowerCase() === 'goalkeeper'}
                  image={player.image}
                  width='80px'
                  height='80px'
                />

                <GridBox rowGap='5px'>
                  <h4 className={c.title}>
                    {player.name ? player.name + ' ' + player.surname : player.nameAPI}
                  </h4>
                  <FlexBox items='center' columnGap='5px'>
                      <span className={c.number}>
                        {player.number}
                      </span>

                    <span className={c.position}>
                        {intl.formatMessage({id: player.position})}
                      </span>
                  </FlexBox>
                </GridBox>
              </div>))}
          </div>
        </>) : (<div>
            <span className={c.chose}>
              {intl.formatMessage({id: 'chose_position'})}
            </span>
        </div>)}

    </div>)
}


export {
  LineupsChooseModal
}