import React from 'react'
import c from './style.module.scss'
import {ClubStatsField} from "../club-stats-field";
import {useIntl} from "react-intl";


const ClubStatsPasses = ({stats}) => {
  const intl = useIntl()

  return (
    <div className={c.wrap}>
      <ClubStatsField
        title={intl.formatMessage({id: 'passes_total'})}
        value={stats.totalValues.passesTotal}
      />
      <ClubStatsField
        isGood={true}
        isTransparent={true}
        title={intl.formatMessage({id: 'passes_accurate'})}
        value={stats.totalValues.passesAccurate}
      />
      <ClubStatsField
        isGood={true}
        title={intl.formatMessage({id: 'passes_proc'})}
        value={(100 / stats.totalValues.passesTotal * stats.totalValues.passesAccurate).toFixed() * 1}
      />
      <ClubStatsField
        isTransparent={true}
        title={intl.formatMessage({id: 'passes_per_game'})}
        value={(stats.totalValues.passesTotal / stats.additional.matches).toFixed() * 1}
      />
      <ClubStatsField
        title={intl.formatMessage({id: 'success_passes_per_game'})}
        value={(stats.totalValues.passesAccurate / stats.additional.matches).toFixed() * 1}
      />
    </div>
  )
}

export {
  ClubStatsPasses
}