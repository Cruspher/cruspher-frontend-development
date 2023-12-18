import React from 'react'
import c from './style.module.scss'
import {FinalLineupArea} from "./components/final-lineup-area";
import {GameHeader} from "../game-header";
import {RatePoints} from "./components/rate-points";
import {StatsCaptains} from "./components/stats-captains";
import {FinalStats} from "./components/final-stats";
import {FinalRateStats} from "./components/final-rate-stats";
import {UpdateGamePlayers} from "../../../pages/update-game-stats/components/update-game-players";
import {sortByRating, sortTopByKey} from "../../../helpers/players";
import {TopRatingsWrap} from "../top-ratings-wrap";
import {useIntl} from "react-intl";


const FinalGameStats = (
  {gameData, gameResult, rateResult, shopElements},
) => {
  const intl = useIntl()
  const ratingsPlayers = Object.keys(gameResult.ratings).map(item => gameResult.ratings[item])

  return (
    <div className={c.wrap}>
      <GameHeader editable={true} gameStats={gameResult.stats} />

      {
        Number.isInteger(rateResult.stats.shots) && (
          <RatePoints lineup={gameData.lineupsPoints} stats={gameData.gamePoints} captains={gameData.captainsPoints} />
        )
      }

      <div className={c.lineupWrap}>
        <FinalLineupArea
          shopElements={shopElements}
          title={intl.formatMessage({id: 'game'})}
          lineup={gameResult.lineup}
          isRate={false}
          formation={gameResult.stats.formation}
        />

        {Number.isInteger(rateResult.stats.shots) && (
          <FinalLineupArea
            formation={rateResult.stats.formation}
            shopElements={shopElements}
            title={intl.formatMessage({id: 'forecast'})}
            lineup={rateResult.lineup}
            isRate={true}
          />
        )}

        <FinalStats isHome={process.env.TEAM_ID === gameResult.stats.homeId.toString()} form={gameResult.stats} />

        {Number.isInteger(rateResult.stats.shots) && (
          <FinalRateStats statsResult={rateResult.statsResult} />
        ) }
      </div>

      {Number.isInteger(rateResult.stats.shots) && <StatsCaptains shopElements={shopElements} captains={rateResult.captains} />}
      <div className={c.ratingsWrap}>
        <div>
          <UpdateGamePlayers shopElements={shopElements} players={sortByRating(ratingsPlayers)} maxValues={gameResult.gameStatsMaxValues} />
        </div>

        <div>
          <div className={c.topWrap}>
            {
              Object.keys(ratingsPlayers[0].statistics).map(key => (
                <TopRatingsWrap
                  key={key}
                  players={sortTopByKey(ratingsPlayers, key)}
                  title={key}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export {
  FinalGameStats
}