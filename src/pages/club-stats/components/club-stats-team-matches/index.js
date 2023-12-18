import React from 'react'
import c from './style.module.scss'
import {FlexBox} from "../../../../components/cruspher-ui/box/flexbox";
import {UpdateGameToShowResult} from "../../../../components/items/update-game-to-show-result";
import {useNavigate} from "react-router-dom";
import {APPRoutes} from "../../../../const/APP-routes";


const ClubStatsTeamMatches = ({matches}) => {
  const navigate = useNavigate()

  return (
    <div className={c.wrap}>
      {
        matches.map(item => (
          <div key={Math.random()} className={c.item} onClick={() => navigate(`${APPRoutes.game}${item.id}`)}>

            <div className={c.table}>
              <FlexBox content="flex-end" columnGap="8px" items="center">
                <img className={c.image} src={item.homeAvatar} alt=""/>
                <h3 className={c.title}>
                  {item.home}
                </h3>
              </FlexBox>

              <FlexBox content="center" items='center'>
                <UpdateGameToShowResult game={item}/>
              </FlexBox>

              <FlexBox columnGap="8px" items="center">
                <h3 className={c.title}>
                  {item.away}
                </h3>
                <img className={c.image} src={item.awayAvatar} alt=""/>
              </FlexBox>
            </div>


          </div>
        ))
      }
    </div>
  )
}


export {
  ClubStatsTeamMatches
}