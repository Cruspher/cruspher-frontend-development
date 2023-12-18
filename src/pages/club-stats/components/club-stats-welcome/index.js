import React from 'react'
import c from './style.module.scss'
import {ViewUniform} from "../../../../components/items/view-uniform";
import {FlexBox} from "../../../../components/cruspher-ui/box/flexbox";


const ClubStatsWelcome = ({uniForms}) => {


  return (
    <div className={c.wrap}>
      <div>
        <div className={c.item}>
          <ViewUniform width='200px' height='200px' uniform={uniForms.home} />
        </div>

        <div className={c.bottomBlock}>
          <div>
            <ViewUniform width='80px' height='80px' uniform={uniForms.away} />
          </div>

          <div>
            <ViewUniform width='80px' height='80px' uniform={uniForms.third} />
          </div>
        </div>
      </div>


      <div className={c.clubWrap}>
        <FlexBox content='center' items='center'>
          <img className={c.icon} src={process.env.REACT_APP_TEAM_ICON} alt=""/>
        </FlexBox>
        <div className={c.title}>
          {process.env.REACT_APP_TEAM_NAME}
        </div>
      </div>

      <div>
        <div className={c.item}>
          <ViewUniform width='200px' height='200px' uniform={uniForms.gkHome} />
        </div>

        <div className={c.bottomBlock}>
          <div>
            <ViewUniform width='80px' height='80px' uniform={uniForms.gkAway} />
          </div>

          <div>
            <ViewUniform width='80px' height='80px' uniform={uniForms.gkThird} />
          </div>
        </div>
      </div>

    </div>
  )
}


export {
  ClubStatsWelcome
}