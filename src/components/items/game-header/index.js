import React, {useState} from 'react'
import c from './style.module.scss'
import {PlayerStatusesModal} from "../../modals/player-statuses-modal";
import {StatusIcon} from "../../cruspher-ui/icons/actions";
import {CalendarIcon, StadiumIcon} from "../../cruspher-ui/icons/default";
import moment from "moment";
import {GridBox} from "../../cruspher-ui/box/grid-box";

const returnClass = (a, b) => {
  if (a > b) return c.bigger
  if (a < b) return c.smaller
  else return c.same
}

const GameHeader = ({gameStats, editable}) => {
  const {home, away, homeScore, awayScore, isStatusesDisabled, stadium, round, league, homeAvatar, awayAvatar, date} = gameStats
  const [isModalShow, setIsModalShow] = useState(false)
  const toggleModal = () => setIsModalShow(!isModalShow)

  const modal = !isStatusesDisabled && isModalShow && (
    <PlayerStatusesModal disabled={!!editable} toggleModal={toggleModal} game={gameStats} />
  )




  return (
      <GridBox rowGap='15px'>
        <div className={c.header}>
          <h3 className={c.league}>{league}</h3>
          <h4 className={c.round}>{round}</h4>
        </div>

        <div className={c.wrap}>
          <div className={c.statuses}>
            <StatusIcon submit={toggleModal} />
          </div>

          <div className={c.container}>
            <h2 className={c.title}>
              <img alt='homeAvatar' src={homeAvatar} />
              <span className={c.name}>{home}</span>
              <span className={returnClass(homeScore, awayScore)}>{homeScore}</span>
              :
              <span className={returnClass(awayScore, homeScore)}>{awayScore}</span>
              <span className={c.name}>{away}</span>
              <img alt='awayAvatar' src={awayAvatar} />
            </h2>
          </div>

          {modal}
        </div>

        <div className={c.footer}>
          <h5 className={c.date}>
            <CalendarIcon />

            <span>
            {moment(date).format('MMMM Do YYYY, HH:mm')}
          </span>
          </h5>
          <h6 className={c.stadium}>
            <StadiumIcon />
            <span>
             {stadium}
          </span>
          </h6>
        </div>
      </GridBox>
  )
}


export {
  GameHeader
}