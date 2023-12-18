import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {LayoutDefault} from "../../components/layouts/layout-default";
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {getPlayerStatsRequest} from "../../actions/games";
import {PlayerInfo} from "./components/player-info";
import {Loading} from "../../components/cruspher-ui/loading";
import {GridBox} from "../../components/cruspher-ui/box/grid-box";
import {ChartDouble} from "../../components/charts/chart-double";
import {EmptyTitle} from "../../components/cruspher-ui/empty-title";


const PlayerStats = () => {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(true)
  const [playerData, setPlayerData] = useState(null)
  const [showElements, setShopElements] = useState(null)
  const [stats, setStats] = useState(null)
  const [isCorrect, setIsCorrect] = useState(true)

  useEffect(() => {
    getStatsHandler()
  }, [])

  const updateData = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }

  const notify = text => toast(text)

  const getStatsHandler = async () => {
    setIsLoading(true)
    const playerId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] * 1

    const res = await getPlayerStatsRequest({id: playerId, season: Number(process.env.REACT_APP_CURRENT_SEASON)})



    if (!!res && res.data) {

      if (!!res.data.length) {
        setPlayerData(res.data[0].player)
        setShopElements(res.shopElements)

        // total stats

        const totalValue = {
          shotsOnGoal: 0,
          shotsTotal: 0,
          passesTotal: 0,
          passesKey: 0,
          goals: 0,
          assists: 0,
          dribblesTotal: 0,
          dribblesSuccess: 0,
          redCards: 0,
          yellowCards: 0,
          minutes: 0,
          passesAccuracy: 0,
          foulCommitted: 0,
          foulDrawn: 0,
          offsides: 0,
          games: res.data.length
        }

        res.data.forEach(game => {
          totalValue.shotsOnGoal += game.shotsOnGoal
          totalValue.shotsTotal += game.shotsTotal
          totalValue.passesTotal += game.passesTotal
          totalValue.passesKey += game.passesKey
          totalValue.passesAccuracy += game.passesAccuracy
          totalValue.goals += game.goals
          totalValue.assists += game.assists
          totalValue.dribblesTotal += game.dribblesTotal
          totalValue.dribblesSuccess += game.dribblesSuccess
          totalValue.redCards += game.redCards
          totalValue.yellowCards += game.yellowCards
          totalValue.minutes += game.minutes
          totalValue.foulCommitted += game.foulCommitted
          totalValue.foulDrawn += game.foulDrawn
          totalValue.offsides += game.offsides
        })

        setStats({
          data: res.data,
          totalValues: totalValue
        })
      } else {
        setIsCorrect(false)
      }

    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const body = isLoading ? (
    <Loading />
  ) : (
    <GridBox rowGap="30px">
      {
        isCorrect  ? (
          <>
            <PlayerInfo data={playerData} stats={stats} showElements={showElements} />
            {
              stats.data.length > 2 && (
                <div className={c.statsWrap}>
                  <ChartDouble
                    value="goals"
                    stats={stats}
                    title={intl.formatMessage({id: "goals"})}
                    count={stats.totalValues.goals}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="minutes"
                    stats={stats}
                    title={intl.formatMessage({id: "minutes_played"})}
                    count={stats.totalValues.minutes}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="shotsTotal"
                    stats={stats}
                    title={intl.formatMessage({id: "shots_total"})}
                    count={stats.totalValues.shotsTotal}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="shotsOnGoal"
                    stats={stats}
                    title={intl.formatMessage({id: "shots_on_goal"})}
                    count={stats.totalValues.shotsOnGoal}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="passesTotal"
                    stats={stats}
                    title={intl.formatMessage({id: "passes_total"})}
                    count={stats.totalValues.passesTotal}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="passesAccuracy"
                    stats={stats}
                    title={intl.formatMessage({id: "passes_accuracy"})}
                    count={stats.totalValues.passesAccuracy}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="passesKey"
                    stats={stats}
                    title={intl.formatMessage({id: "key_passes"})}
                    count={stats.totalValues.passesKey}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="assists"
                    stats={stats}
                    title={intl.formatMessage({id: "assists"})}
                    count={stats.totalValues.assists}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="dribblesTotal"
                    stats={stats}
                    title={intl.formatMessage({id: "dribbles_total"})}
                    count={stats.totalValues.dribblesTotal}
                    updateData={updateData}
                  />

                  <ChartDouble
                    value="dribblesSuccess"
                    stats={stats}
                    title={intl.formatMessage({id: "dribbles_success"})}
                    count={stats.totalValues.dribblesSuccess}
                    updateData={updateData}
                  />
                </div>
              )
            }
          </>
        ) : (
          <EmptyTitle errorText={intl.formatMessage({id: "not_have_stats"})} />
        )
      }

    </GridBox>
  )

  return (
    <LayoutDefault>
      <Wrap vPadding="30px">
        {body}
      </Wrap>
    </LayoutDefault>
  )
}


export {
  PlayerStats
}