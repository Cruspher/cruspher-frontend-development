import React from 'react'
import c from './style.module.scss'
import {PlayerInfoItem} from "../player-info-item";
import {PlayerWithForm} from "../../../../components/items/player-with-form";
import {useIntl} from "react-intl";
import {GridBox} from "../../../../components/cruspher-ui/box/grid-box";


const PlayerInfo = ({data, showElements, stats}) => {
  const intl = useIntl()

  return (
    <GridBox rowGap="30px">
      <div className={c.header}>
        <div className={c.image}>
          <PlayerWithForm
            image={data.image}
            isGK={data.position.toLowerCase() === 'gk'}
            width='250px'
            height="250px"
            shopElements={showElements}
          />
        </div>

        <div>
          <div className={c.info}>
            <PlayerInfoItem isWhite={true} title={intl.formatMessage({id: "name_and_surname"})} value={`${data.name} ${data.surname}`}  />
            <PlayerInfoItem isWhite={true} title={intl.formatMessage({id: "number"})} value={data.number}  />
            <PlayerInfoItem isWhite={true} title={intl.formatMessage({id: "position"})} value={data.position}  />
          </div>
        </div>
      </div>

      <div className={c.wrap}>


        <div>
          <div className={c.info}>
            <PlayerInfoItem title={intl.formatMessage({id: 'games'})} value={stats.totalValues.games}  />
            <PlayerInfoItem title={intl.formatMessage({id: 'minutes_played'})} value={stats.totalValues.minutes}  />
            <PlayerInfoItem title={intl.formatMessage({id: 'minutes_per_game'})} value={(stats.totalValues.minutes / stats.totalValues.games).toFixed(1)}  />
          </div>
        </div>

        <div>
          <div className={c.info}>
            <PlayerInfoItem
              title={intl.formatMessage({id: 'goals'})}
              value={stats.totalValues.goals}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'game_per_goal'})}
              value={!!stats.totalValues.goals ? (stats.totalValues.games / stats.totalValues.goals).toFixed(1) : '-'}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'minutes_per_goal'})}
              value={!!stats.totalValues.goals ? (stats.totalValues.minutes / stats.totalValues.goals).toFixed(1) : '-'}
            />
          </div>
        </div>

        <div>
          <div className={c.info}>
            <PlayerInfoItem
              title={intl.formatMessage({id: 'shots_total'})}
              value={stats.totalValues.shotsTotal}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'shots_on_goal'})}
              value={stats.totalValues.shotsOnGoal}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'shots_per_game'})}
              value={(stats.totalValues.shotsTotal / stats.totalValues.games).toFixed(1)}
            />
          </div>
        </div>

        <div>
          <div className={c.info}>
            <PlayerInfoItem
              title={intl.formatMessage({id: 'passes_total'})}
              value={stats.totalValues.passesTotal}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'passes_success'})}
              value={stats.totalValues.passesAccuracy}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'key_passes'})}
              value={stats.totalValues.passesKey}
            />
          </div>
        </div>

        <div>
          <div className={c.info}>
            <PlayerInfoItem
              title={intl.formatMessage({id: 'dribbles_total'})}
              value={stats.totalValues.dribblesTotal}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'dribbles_success'})}
              value={stats.totalValues.dribblesSuccess}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'dribbles_per_game'})}
              value={(stats.totalValues.dribblesTotal / stats.totalValues.games).toFixed(1)}
            />
          </div>
        </div>

        <div>
          <div className={c.info}>
            <PlayerInfoItem
              title={intl.formatMessage({id: 'fouls_committed'})}
              value={stats.totalValues.foulCommitted}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'yellow_cards'})}
              value={stats.totalValues.yellowCards}
            />
            <PlayerInfoItem
              title={intl.formatMessage({id: 'red_cards'})}
              value={stats.totalValues.redCards}
            />
          </div>
        </div>
      </div>
    </GridBox>
  )
}


export {
  PlayerInfo
}