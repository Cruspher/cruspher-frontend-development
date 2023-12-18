import React from 'react'
import c from './style.module.scss'
import {ClubStatsDefault} from "../club-stats-default";
import {ChartPie} from "../../../../components/charts/chart-pie";
import {ClubStatsShots} from "../club-stats-shots";
import {ClubStatsPasses} from "../club-stats-passes";


const matchColors = [ '#28991c', '#d8db21', '#a50044'];
const shotsColors = [ '#28991c', '#a50044'];


const ClubStatsHeader = ({stats}) => {
  const matchData = [
    { name: 'win', value: stats.additional.win, color: '#28991c' },
    { name: 'draw', value: stats.additional.draw, color: '#d8db21' },
    { name: 'lose', value: stats.additional.lose, color: '#a50044' },
  ]

  const shotsDataData = [
    { name: 'shots_on_goal', value: stats.totalValues.shotsOnGoal, color: '#28991c' },
    { name: 'missed_shots', value:  stats.totalValues.shotsTotal - stats.totalValues.shotsOnGoal, color: '#a50044' },
  ]

  const passesDataData = [
    { name: 'success_passes', value: stats.totalValues.passesAccurate, color: '#28991c' },
    { name: 'wrong_passes', value:  stats.totalValues.passesTotal - stats.totalValues.passesAccurate, color: '#a50044' },
  ]

  const opponentsData = {
    goals: [
      { name: 'team_goals', value: stats.totalValues.goals, color: '#28991c' },
      { name: 'opponent_goals', value:  stats.totalValues.opponent.goals, color: '#a50044' },
    ],
    shots: [
      { name: 'team_shots', value: stats.totalValues.shotsTotal, color: '#28991c' },
      { name: 'opponent_shots', value:  stats.totalValues.opponent.shotsTotal, color: '#a50044' },
    ],
    shotsOnGoal: [
      { name: 'team_shots_on_goal', value: stats.totalValues.shotsOnGoal, color: '#28991c' },
      { name: 'opponent_shots_on_goal', value:  stats.totalValues.opponent.shotsOnGoal, color: '#a50044' },
    ],
    passes: [
      { name: 'team_passes', value: stats.totalValues.passesTotal, color: '#28991c' },
      { name: 'opponent_passes', value:  stats.totalValues.opponent.passesTotal, color: '#a50044' },
    ],
    passesAccurate: [
      { name: 'team_passes_accurate', value: stats.totalValues.passesAccurate, color: '#28991c' },
      { name: 'opponent_passes_accurate', value:  stats.totalValues.opponent.passesAccurate, color: '#a50044' },
    ],
    corners: [
      { name: 'team_corners', value: stats.totalValues.corners, color: '#28991c' },
      { name: 'opponent_corners', value:  stats.totalValues.opponent.corners, color: '#a50044' },
    ],
    homeAwayGoals: [
      { name: 'team_goals_home', value: stats.totalValues.home.goals, color: '#28991c' },
      { name: 'team_goals_away', value:  stats.totalValues.away.goals, color: '#a50044' },
    ],
    homeAwayShots: [
      { name: 'team_shots_home', value: stats.totalValues.home.shotsTotal, color: '#28991c' },
      { name: 'team_shots_away', value:  stats.totalValues.away.shotsTotal, color: '#a50044' },
    ],
    homeAwayPasses: [
      { name: 'team_passes_home', value: stats.totalValues.home.passesTotal, color: '#28991c' },
      { name: 'team_passes_away', value:  stats.totalValues.away.passesTotal, color: '#a50044' },
    ]
  }

  return (
    <div className={c.header}>
      <div className={c.about}>
        <ClubStatsDefault stats={stats} />
        <ClubStatsShots stats={stats} />
        <ClubStatsPasses stats={stats} />
        <ChartPie colors={matchColors} data={matchData} />
        <ChartPie colors={shotsColors} data={shotsDataData} />
        <ChartPie colors={shotsColors} data={passesDataData} />
        <ChartPie colors={shotsColors} data={opponentsData.homeAwayGoals} />
        <ChartPie colors={shotsColors} data={opponentsData.homeAwayShots} />
        <ChartPie colors={shotsColors} data={opponentsData.homeAwayPasses} />
        <ChartPie colors={shotsColors} data={opponentsData.goals} />
        <ChartPie colors={shotsColors} data={opponentsData.shots} />
        <ChartPie colors={shotsColors} data={opponentsData.shotsOnGoal} />
        <ChartPie colors={shotsColors} data={opponentsData.passes} />
        <ChartPie colors={shotsColors} data={opponentsData.passesAccurate} />
        <ChartPie colors={shotsColors} data={opponentsData.corners} />
      </div>
    </div>
  )
}


export {
  ClubStatsHeader
}