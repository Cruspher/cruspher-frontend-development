import React from 'react'
import c from './style.module.scss'
import {ClubStatsField} from "../club-stats-field";
import {useIntl} from "react-intl";


const ClubStatsShots = ({stats}) => {
  const intl = useIntl()

  return (
    <div className={c.wrap}>
      <ClubStatsField
        title={intl.formatMessage({id: 'shots_total'})}
        value={stats.totalValues.shotsTotal}
      />
      <ClubStatsField
        isGood={true}
        isTransparent={true}
        title={intl.formatMessage({id: 'shots_on_goal'})}
        value={stats.totalValues.shotsOnGoal}
      />
      <ClubStatsField
        isGood={true}
        title={intl.formatMessage({id: 'shots_inside_box'})}
        value={stats.totalValues.shotsInsideBox}
      />
      <ClubStatsField
        isBad={true}
        isTransparent={true}
        title={intl.formatMessage({id: 'shots_outside_box'})}
        value={stats.totalValues.shotOutsideBox}
      />
      <ClubStatsField
        title={intl.formatMessage({id: 'shots_per_game'})}
        value={(stats.totalValues.shotsTotal / stats.additional.matches).toFixed() * 1}
      />
    </div>
  )
}

export {
  ClubStatsShots
}