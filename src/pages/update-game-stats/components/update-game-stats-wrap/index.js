import React from 'react'
import c from './style.module.scss'
import {UpdateGameFormItem} from "../update-game-form-item";
import {useIntl} from "react-intl";


const UpdateGameStatsWrap = ({form}) => {
  const intl = useIntl()

  return (
    <div>
        <div className={c.wrap}>
            <UpdateGameFormItem
              valueHome={form.homeScore}
              valueAway={form.awayScore}
              title={intl.formatMessage({id: "goals"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeShotsOnGoal}
              valueAway={form.awayShotsOnGoal}
              title={intl.formatMessage({id: "shots_on_goal"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeShotsTotal}
              valueAway={form.awayShotsTotal}
              title={intl.formatMessage({id: "shots_total"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeBlockShots}
              valueAway={form.awayBlockShots}
              title={intl.formatMessage({id: "block_shoots"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeShotsInsideBox}
              valueAway={form.awayShotsInsideBox}
              title={intl.formatMessage({id: "shot_inside_box"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeShotsOutsideBox}
              valueAway={form.awayShotsOutsideBox}
              title={intl.formatMessage({id: "shot_outside_box"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeCorners}
              valueAway={form.awayCorners}
              title={intl.formatMessage({id: "corners"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeOffsides}
              valueAway={form.awayOffsides}
              title={intl.formatMessage({id: "offsides"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeBallPossession}
              valueAway={form.awayBallPossession}
              title={intl.formatMessage({id: "ball_possession"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeSaves}
              valueAway={form.homeSaves}
              title={intl.formatMessage({id: "saves"})}
            />

            <UpdateGameFormItem
              valueHome={form.homePassesTotal}
              valueAway={form.awayPassesTotal}
              title={intl.formatMessage({id: "passes_total"})}
            />

            <UpdateGameFormItem
              valueHome={form.homePassesAccurate}
              valueAway={form.awayPassesAccurate}
              title={intl.formatMessage({id: "passes_accurate"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeYellowCard}
              valueAway={form.awayYellowCard}
              title={intl.formatMessage({id: "yellow_cards"})}
            />

            <UpdateGameFormItem
              valueHome={form.homeRedCard}
              valueAway={form.awayRedCard}
              title={intl.formatMessage({id: "red_cards"})}
            />

        </div>
    </div>
  )
}


export {
  UpdateGameStatsWrap
}