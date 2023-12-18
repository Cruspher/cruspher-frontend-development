import React from 'react'
import c from './style.module.scss'
import {ClubStatsTeamMatches} from "../club-stats-team-matches";
import {PlayerWithForm} from "../../../../components/items/player-with-form";
import {useNavigate} from "react-router-dom";
import {APPRoutes} from "../../../../const/APP-routes";


const ClubStatsTeam = ({statsData, shopElements, players}) => {
  const navigate = useNavigate()
  const chosePlayerHandler = (id) => {
    navigate(`${APPRoutes.playerStats}/${id}`)
  }

  return (
    <div className={c.wrap}>
      <div>
        <ClubStatsTeamMatches matches={statsData} />
      </div>
      <div>
        {
          players.map(player => (
            <div key={Math.random().toString()} className={c.player} onClick={() => chosePlayerHandler(player.id)}>
              <PlayerWithForm isGK={player.position.toLowerCase() === 'goalkeeper'} width='50px' height='50px' shopElements={shopElements} image={player.image} />
              <h4>
                {
                  !player.name ? (
                    <>{player.nameAPI}</>
                  ) : (
                    <>{player.name} {player.surname}</>
                  )
                }
              </h4>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export {
  ClubStatsTeam
}