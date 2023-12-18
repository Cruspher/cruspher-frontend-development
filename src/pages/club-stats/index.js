import React, {useEffect, useState} from 'react'
import {LayoutDefault} from "../../components/layouts/layout-default";
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {GridBox} from "../../components/cruspher-ui/box/grid-box";
import {ChartTriple} from "../../components/charts/chart-triple";
import {getClubStatsRequest} from "../../actions/games";
import {toast} from "react-toastify";
import {Loading} from "../../components/cruspher-ui/loading";
import {ClubStatsHeader} from "./components/club-stats-header";
import {ClubStatsWelcome} from "./components/club-stats-welcome";
import {ClubStatsTeam} from "./components/club-stats-team";
import {ClubStatsMore} from "./components/club-stats-more";


const ClubStatsPage = () => {
  const intl = useIntl()
  const notify = text => toast(text)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [uniForms, setUniforms] = useState({
    home: '',
    away: ''
  })
  const [statsData, setStatsData] = useState([])
  const [shopElements, setShopElements] = useState(null)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async () => {
    setIsLoading(true)

    const {data, shopElements, clubShopElements, players} = await getClubStatsRequest()
    if (data) {
      let statsToSet

      const totalValues = {
        games: data.length,
        goals: 0,
        shotsOnGoal: 0,
        shotsTotal: 0,
        shotsInsideBox: 0,
        shotOutsideBox: 0,
        passesTotal: 0,
        passesAccurate: 0,
        corners: 0,
        saves: 0,
        fouls: 0,
        offsides: 0,
        yellowCard: 0,
        redCard: 0,
        home: {
          games: 0,
          goals: 0,
          shotsOnGoal: 0,
          shotsTotal: 0,
          shotsInsideBox: 0,
          shotOutsideBox: 0,
          passesTotal: 0,
          passesAccurate: 0,
          corners: 0,
          saves: 0,
          fouls: 0,
          offsides: 0,
          yellowCard: 0,
          redCard: 0
        },
        away: {
          games: 0,
          goals: 0,
          shotsOnGoal: 0,
          shotsTotal: 0,
          shotsInsideBox: 0,
          shotOutsideBox: 0,
          passesTotal: 0,
          passesAccurate: 0,
          corners: 0,
          saves: 0,
          fouls: 0,
          offsides: 0,
          yellowCard: 0,
          redCard: 0
        },
        opponent: {
          goals: 0,
          shotsOnGoal: 0,
          shotsTotal: 0,
          shotsInsideBox: 0,
          shotOutsideBox: 0,
          passesTotal: 0,
          passesAccurate: 0,
          corners: 0,
          saves: 0,
          fouls: 0,
          offsides: 0,
          yellowCard: 0,
          redCard: 0,
        }
      }

      const additional = {
        matches: data.length,
        win: 0,
        draw: 0,
        lose: 0,
        goals: {
          notHave: {name: '0', value: 0},
          one: {name: '1', value: 0},
          two: {name: '2', value: 0},
          moreTwo: {name: '>2', value: 0}
        },
        shots: {
          less10: {name: '<10', value: 0},
          more10: {name: '>10', value: 0},
          more15: {name: '>15', value: 0}
        },
        ballPossession: {
          less50: {name: '<50', value: 0},
          more50: {name: '>49', value: 0},
          more60: {name: '>60', value: 0}
        }
      }



      statsToSet = data.map((item) => {
        if (process.env.REACT_APP_TEAM_ID === item.homeId.toString()) {

          // home and away
          totalValues.goals += item.homeScore
          totalValues.shotsTotal += item.homeShotsTotal
          totalValues.shotsOnGoal += item.homeShotsOnGoal
          totalValues.shotsInsideBox += item.homeShotsInsideBox
          totalValues.shotOutsideBox += item.homeShotsOutsideBox
          totalValues.passesTotal += item.homePassesTotal
          totalValues.passesAccurate += item.homePassesAccurate
          totalValues.corners += item.homeCorners
          totalValues.saves += item.homeSaves
          totalValues.fouls += item.homeFouls
          totalValues.offsides += item.homeOffsides
          totalValues.yellowCard += item.homeYellowCard
          totalValues.redCard += item.homeRedCard

          totalValues.opponent.goals += item.awayScore
          totalValues.opponent.shotsTotal += item.awayShotsTotal
          totalValues.opponent.shotsOnGoal += item.awayShotsOnGoal
          totalValues.opponent.shotsInsideBox += item.awayShotsInsideBox
          totalValues.opponent.shotOutsideBox += item.awayShotsOutsideBox
          totalValues.opponent.passesTotal += item.awayPassesTotal
          totalValues.opponent.passesAccurate += item.awayPassesAccurate
          totalValues.opponent.corners += item.awayCorners
          totalValues.opponent.saves += item.awaySaves
          totalValues.opponent.fouls += item.awayFouls
          totalValues.opponent.offsides += item.awayOffsides
          totalValues.opponent.yellowCard += item.awayYellowCard
          totalValues.opponent.redCard += item.awayRedCard

          // home
          totalValues.home.games += 1
          totalValues.home.goals += item.homeScore
          totalValues.home.shotsTotal += item.homeShotsTotal
          totalValues.home.shotsOnGoal += item.homeShotsOnGoal
          totalValues.home.shotsInsideBox += item.homeShotsInsideBox
          totalValues.home.shotOutsideBox += item.homeShotsOutsideBox
          totalValues.home.passesTotal += item.homePassesTotal
          totalValues.home.passesAccurate += item.homePassesAccurate
          totalValues.home.corners += item.homeCorners
          totalValues.home.saves += item.homeSaves
          totalValues.home.fouls += item.homeFouls
          totalValues.home.offsides += item.homeOffsides
          totalValues.home.yellowCard += item.homeYellowCard
          totalValues.home.redCard += item.homeRedCard


          // goals
          if (item.homeScore === 0) {
            additional.goals.notHave.value += 1
          } else if (item.homeScore === 1) {
            additional.goals.one.value += 1
          } else if (item.homeScore === 2) {
            additional.goals.two.value += 1
          } else {
            additional.goals.moreTwo.value += 1
          }

          // shots
          if (item.homeShotsTotal < 11) {
            additional.shots.less10.value += 1
          } else if (item.homeShotsTotal > 10 && item.homeShotsTotal < 16) {
            additional.shots.more10.value += 1
          } else {
            additional.shots.more15.value += 1
          }

          // ball possession
          if (item.homeBallPossession < 50) {
            additional.ballPossession.less50.value += 1
          } else if (item.homeBallPossession > 49 && item.homeBallPossession < 61) {
            additional.ballPossession.more50.value += 1
          } else {
            additional.ballPossession.more60.value += 1
          }


          // match win lose draw
          if (item.homeScore > item.awayScore) {
            additional.win += 1
          } else if (item.homeScore === item.awayScore) {
            additional.draw += 1
          } else if (item.homeScore < item.awayScore) {
            additional.lose += 1
          }


          return {
            goals: item.homeScore,
            shotsOnGoal: item.homeShotsOnGoal,
            shotsTotal: item.homeShotsTotal,
            shotsInsideBox: item.homeShotsInsideBox,
            shotOutsideBox: item.homeShotsOutsideBox,
            passesTotal: item.homePassesTotal,
            passesAccurate: item.homePassesAccurate,
            passProc: (100 / item.homePassesTotal * item.homePassesAccurate).toFixed() * 1,
            ballPossession: item.homeBallPossession,
            corners: item.homeCorners,
            saves: item.homeSaves,
            fouls: item.homeFouls,
            offsides: item.homeOffsides,
            yellowCard: item.homeYellowCard,
            redCard: item.homeRedCard,

            opponent_goals: item.awayScore,
            opponent_shotsOnGoal: item.awayShotsOnGoal,
            opponent_shotsTotal: item.awayShotsTotal,
            opponent_shotsInsideBox: item.awayShotsInsideBox,
            opponent_shotOutsideBox: item.awayShotsOutsideBox,
            opponent_passesTotal: item.awayPassesTotal,
            opponent_passesAccurate: item.awayPassesAccurate,
            opponent_passProc: (100 / item.awayPassesTotal * item.awayPassesAccurate).toFixed() * 1,
            opponent_ballPossession: item.awayBallPossession,
            opponent_corners: item.awayCorners,
            opponent_saves: item.awaySaves,
            opponent_fouls: item.awayFouls,
            opponent_offsides: item.awayOffsides,
            opponent_yellowCard: item.awayYellowCard,
            opponent_redCard: item.awayRedCard
          }
        }
        else {
          // home and away
          totalValues.goals += item.awayScore
          totalValues.shotsTotal += item.awayShotsTotal
          totalValues.shotsOnGoal += item.awayShotsOnGoal
          totalValues.shotsInsideBox += item.awayShotsInsideBox
          totalValues.shotOutsideBox += item.awayShotsOutsideBox
          totalValues.passesTotal += item.awayPassesTotal
          totalValues.passesAccurate += item.awayPassesAccurate
          totalValues.corners += item.awayCorners
          totalValues.saves += item.awaySaves
          totalValues.fouls += item.awayFouls
          totalValues.offsides += item.awayOffsides
          totalValues.yellowCard += item.awayYellowCard
          totalValues.redCard += item.awayRedCard

          totalValues.opponent.goals += item.homeScore
          totalValues.opponent.shotsTotal += item.homeShotsTotal
          totalValues.opponent.shotsOnGoal += item.homeShotsOnGoal
          totalValues.opponent.shotsInsideBox += item.homeShotsInsideBox
          totalValues.opponent.shotOutsideBox += item.homeShotsOutsideBox
          totalValues.opponent.passesTotal += item.homePassesTotal
          totalValues.opponent.passesAccurate += item.homePassesAccurate
          totalValues.opponent.corners += item.homeCorners
          totalValues.opponent.saves += item.homeSaves
          totalValues.opponent.fouls += item.homeFouls
          totalValues.opponent.offsides += item.homeOffsides
          totalValues.opponent.yellowCard += item.homeYellowCard
          totalValues.opponent.redCard += item.homeRedCard

          // away
          totalValues.away.games += 1
          totalValues.away.goals += item.awayScore
          totalValues.away.shotsTotal += item.awayShotsTotal
          totalValues.away.shotsOnGoal += item.awayShotsOnGoal
          totalValues.away.shotsInsideBox += item.awayShotsInsideBox
          totalValues.away.shotOutsideBox += item.awayShotsOutsideBox
          totalValues.away.passesTotal += item.awayPassesTotal
          totalValues.away.passesAccurate += item.awayPassesAccurate
          totalValues.away.corners += item.awayCorners
          totalValues.away.saves += item.awaySaves
          totalValues.away.fouls += item.awayFouls
          totalValues.away.offsides += item.awayOffsides
          totalValues.away.yellowCard += item.awayYellowCard
          totalValues.away.redCard += item.awayRedCard

          // match win lose draw

          if (item.homeScore < item.awayScore) {
            additional.win += 1
          }
          if (item.homeScore === item.awayScore) {
            additional.draw += 1
          }
          if (item.homeScore > item.awayScore) {
            additional.lose += 1
          }


          // goals
          if (item.awayScore === 0) {
            additional.goals.notHave.valuee += 1
          } else if (item.awayScore.value === 1) {
            additional.goals.one += 1
          } else if (item.awayScore.value === 2) {
            additional.goals.two += 1
          } else {
            additional.goals.moreTwo.value += 1
          }

          // shots
          if (item.awayShotsTotal < 11) {
            additional.shots.less10.value += 1
          } else if (item.awayShotsTotal > 10 && item.awayShotsTotal < 16) {
            additional.shots.more10.value += 1
          } else {
            additional.shots.more15.value += 1
          }

          // ball possessions
          if (item.awayBallPossession < 50) {
            additional.ballPossession.less50.value += 1
          } else if (item.awayBallPossession > 49 && item.awayBallPossession < 61) {
            additional.ballPossession.more50.value += 1
          } else {
            additional.ballPossession.more60.value += 1
          }

          return {
            goals: item.awayScore,
            shotsOnGoal: item.awayShotsOnGoal,
            shotsTotal: item.awayShotsTotal,
            shotsInsideBox: item.awayShotsInsideBox,
            shotOutsideBox: item.awayShotsOutsideBox,
            passesTotal: item.awayPassesTotal,
            passesAccurate: item.awayPassesAccurate,
            passProc: (100 / item.awayPassesTotal * item.awayPassesAccurate).toFixed() * 1,
            ballPossession: item.awayBallPossession,
            corners: item.awayCorners,
            saves: item.awaySaves,
            fouls: item.awayFouls,
            offsides: item.awayOffsides,
            yellowCard: item.awayYellowCard,
            redCard: item.awayRedCard,

            opponent_goals: item.homeScore,
            opponent_shotsOnGoal: item.homeShotsOnGoal,
            opponent_shotsTotal: item.homeShotsTotal,
            opponent_shotsInsideBox: item.homeShotsInsideBox,
            opponent_shotOutsideBox: item.homeShotsOutsideBox,
            opponent_passesTotal: item.homePassesTotal,
            opponent_passesAccurate: item.homePassesAccurate,
            opponent_passProc: (100 / item.homePassesTotal * item.homePassesAccurate).toFixed() * 1,
            opponent_ballPossession: item.homeBallPossession,
            opponent_corners: item.homeCorners,
            opponent_saves: item.homeSaves,
            opponent_fouls: item.homeFouls,
            opponent_offsides: item.homeOffsides,
            opponent_yellowCard: item.homeYellowCard,
            opponent_redCard: item.homeRedCard
          }
        }
      })


      setStats({
        data: statsToSet,
        totalValues: totalValues,
        additional: additional
      })
      setPlayers(players)
      setStatsData(data)

      const elementsValue = {}
      Object.values(clubShopElements).forEach((item) => {
        elementsValue[item.role] = item
      })


      setUniforms({
        home: elementsValue['11'].image,
        away: elementsValue['12'].image,
        third: elementsValue['13'].image,
        gkHome: elementsValue['21'].image,
        gkAway: elementsValue['22'].image,
        gkThird: elementsValue['23'].image
      })
      setShopElements(shopElements)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const updateData = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }


  const body = isLoading ? <Loading /> : (
    <GridBox rowGap='30px'>
      <ClubStatsWelcome uniForms={uniForms} />
      {
        stats.totalValues.games > 0 && (
          <>
            <ClubStatsTeam players={players} shopElements={shopElements} statsData={statsData} />
            <ClubStatsHeader stats={stats} />
          </>
        )
      }

      {
        stats.totalValues.games > 2 && (
          <>
            <div className={c.wrap}>
              <ChartTriple
                updateData={updateData}
                count={stats.totalValues.goals}
                value='goals'
                title={intl.formatMessage({id: 'goals'})}
                stats={stats}
              />
              <ChartTriple updateData={updateData} count={stats.totalValues.shotsTotal} value='shotsTotal' title={intl.formatMessage({id: 'shots_total'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.shotsOnGoal} value='shotsOnGoal' title={intl.formatMessage({id: 'shots_on_goal'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.shotsInsideBox} value='shotsInsideBox' title={intl.formatMessage({id: 'shots_inside_box'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.shotOutsideBox} value='shotOutsideBox' title={intl.formatMessage({id: 'shots_outside_box'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.passesTotal} value='passesTotal' title={intl.formatMessage({id: 'passes_total'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.passesAccurate} value='passesAccurate' title={intl.formatMessage({id: 'passes_accurate'})} stats={stats} />
              <ChartTriple updateData={updateData} isProc={true} value='passProc' title={intl.formatMessage({id: 'passes_accurate_proc'})} stats={stats} />


              <ChartTriple updateData={updateData} isProc={true} value='ballPossession' title={intl.formatMessage({id: 'ball_possession'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.corners} value='corners' title={intl.formatMessage({id: 'corners'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.saves} value='saves' title={intl.formatMessage({id: 'saves'})} stats={stats} />

              <ChartTriple updateData={updateData} count={stats.totalValues.fouls} isBad={true} value='fouls' title={intl.formatMessage({id: 'fouls'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.yellowCard} isYellow={true} value='yellowCard' title={intl.formatMessage({id: 'yellow_cards'})} stats={stats} />
              <ChartTriple updateData={updateData} count={stats.totalValues.goals} isBad={true} value='redCard' title={intl.formatMessage({id: 'red_cards'})} stats={stats} />

              <ChartTriple updateData={updateData} count={stats.totalValues.offsides} isBad={true} value='offsides' title={intl.formatMessage({id: 'offsides'})} stats={stats} />

            </div>
            <ClubStatsMore stats={stats} />
          </>
        )
      }
    </GridBox>
  )


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        {body}
      </Wrap>
    </LayoutDefault>
  )
}


export {
  ClubStatsPage
}