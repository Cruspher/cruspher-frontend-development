import React from 'react'
import c from './style.module.scss'
import {UpdateGameFormItem} from "../../../../../pages/update-game-stats/components/update-game-form-item";
import {useIntl} from "react-intl";


const FinalStats = ({form, isHome}) => {
  const intl = useIntl()


  return (
    <div className={c.wrap}>
      <UpdateGameFormItem
        valueHome={form.homeScore}
        valueAway={form.awayScore}
        title={intl.formatMessage({id: 'goals'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeShotsOnGoal}
        valueAway={form.awayShotsOnGoal}
        title={intl.formatMessage({id: 'shots_on_goal'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeShotsTotal}
        valueAway={form.awayShotsTotal}
        title={intl.formatMessage({id: 'shots_total'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeBlockShots}
        valueAway={form.awayBlockShots}
        title={intl.formatMessage({id: 'block_shoots'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeShotsInsideBox}
        valueAway={form.awayShotsInsideBox}
        title={intl.formatMessage({id: 'shot_inside_box'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeShotsOutsideBox}
        valueAway={form.awayShotsOutsideBox}
        title={intl.formatMessage({id: 'shot_outside_box'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeCorners}
        valueAway={form.awayCorners}
        title={intl.formatMessage({id: 'corners'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeOffsides}
        valueAway={form.awayOffsides}
        title={intl.formatMessage({id: 'offsides'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeBallPossession}
        valueAway={form.awayBallPossession}
        title={intl.formatMessage({id: 'ball_possession'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeSaves}
        valueAway={form.homeSaves}
        title={intl.formatMessage({id: 'saves'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homePassesTotal}
        valueAway={form.awayPassesTotal}
        title={intl.formatMessage({id: 'passes_total'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homePassesAccurate}
        valueAway={form.awayPassesAccurate}
        title={intl.formatMessage({id: 'passes_accurate'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeYellowCard}
        valueAway={form.awayYellowCard}
        title={intl.formatMessage({id: 'yellow_cards'})}
        isHome={isHome}
      />

      <UpdateGameFormItem
        valueHome={form.homeRedCard}
        valueAway={form.awayRedCard}
        title={intl.formatMessage({id: 'red_cards'})}
        isHome={isHome}
      />
    </div>
  )
}


export {
  FinalStats
}