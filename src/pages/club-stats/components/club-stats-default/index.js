import React from 'react'
import c from './style.module.scss'
import {ClubStatsField} from "../club-stats-field";
import {useIntl} from "react-intl";


const ClubStatsDefault = ({stats}) => {
  const intl = useIntl()

  return (
    <div className={c.wrap}>
      <ClubStatsField
        title={intl.formatMessage({id: 'matches'})}
        value={stats.additional.matches}
      />
      <ClubStatsField
        isGood={true}
        isTransparent={true}
        title={intl.formatMessage({id: 'win'})}
        value={stats.additional.win}
      />
      <ClubStatsField
        title={intl.formatMessage({id: 'draw'})}
        value={stats.additional.draw}
      />
      <ClubStatsField
        isBad={true}
        isTransparent={true}
        title={intl.formatMessage({id: 'lose'})}
        value={stats.additional.lose}
      />
      <ClubStatsField
        isGood={true}
        title={intl.formatMessage({id: 'goals'})}
        value={stats.totalValues.goals}
      />
    </div>
  )
}

export {
  ClubStatsDefault
}