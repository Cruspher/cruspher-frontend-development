import React from 'react'
import c from './style.module.scss'
import {ClubStatsField} from "../club-stats-field";
import {useIntl} from "react-intl";

const ClubStatsMore = ({stats}) => {
  const intl = useIntl()

  const matchesValue = [
    {title: "games", value: stats.additional.matches},
    {title: "games_home", value: stats.totalValues.home.games},
    {title: "games_away", value: stats.totalValues.away.games},
  ]

  const goalsValues = [
    {title: "goals", value: stats.totalValues.goals},
    {title: "goals_home", value: stats.totalValues.home.goals},
    {title: "goals_away", value: stats.totalValues.away.goals},



    {title: "goals_per_game", value: (stats.totalValues.goals / stats.additional.matches).toFixed(1)},
    {title: "goals_home_per_game", value: (stats.totalValues.home.goals / stats.totalValues.home.games).toFixed(1)},
    {title: "goals_away_per_game", value: (stats.totalValues.away.goals / stats.totalValues.away.games).toFixed(1)},

    {title: "not_have", value: stats.additional.goals.notHave.value},
    {title: "one", value: stats.additional.goals.one.value},
    {title: "two", value: stats.additional.goals.two.value},
    {title: "more_two", value: stats.additional.goals.moreTwo.value},
  ]

  const shotsValue = [
    {title: "shots", value: stats.totalValues.shotsTotal},
    {title: "shots_home", value: stats.totalValues.home.shotsTotal},
    {title: "shots_away", value: stats.totalValues.away.shotsTotal},
    {title: "goals_per_shot", value: (stats.totalValues.shotsTotal / stats.totalValues.goals).toFixed(1)},
    {title: "goals_home_per_shot", value: (stats.totalValues.home.shotsTotal / stats.totalValues.home.goals).toFixed(1)},
    {title: "goals_away_per_shot", value: (stats.totalValues.away.shotsTotal / stats.totalValues.away.goals).toFixed(1)},
    {title: "shots_per_games", value: (stats.totalValues.shotsTotal / stats.totalValues.goals).toFixed(1)},
    {title: "shots_home_per_games", value: (stats.totalValues.home.shotsTotal / stats.totalValues.home.games).toFixed(1)},
    {title: "shots_away_per_games", value: (stats.totalValues.away.shotsTotal / stats.totalValues.away.games).toFixed(1)},
    {title: "less_11", value: stats.additional.shots.less10.value},
    {title: "more_10", value: stats.additional.shots.more10.value},
    {title: "more_15", value: stats.additional.shots.more15.value},
  ]

  const shotsOnGoalValue = [
    {title: "shots_on_goal", value: stats.totalValues.shotsOnGoal},
    {title: "shots_on_goal_home", value: stats.totalValues.home.shotsOnGoal},
    {title: "shots_on_goal_away", value: stats.totalValues.away.shotsOnGoal},
    {title: "shots_on_goal_per_goal", value: (stats.totalValues.shotsOnGoal / stats.totalValues.goals).toFixed(1)},
    {title: "shots_on_goal_home_per_goal", value: (stats.totalValues.home.shotsOnGoal / stats.totalValues.home.goals).toFixed(1)},
    {title: "shots_on_goal_away_per_goal", value: (stats.totalValues.away.shotsOnGoal / stats.totalValues.away.goals).toFixed(1)},
    {title: "shots_on_goal_per_games", value: (stats.totalValues.shotsOnGoal / stats.totalValues.goals).toFixed(1)},
    {title: "shots_on_goal_home_per_games", value: (stats.totalValues.home.shotsOnGoal / stats.totalValues.home.games).toFixed(1)},
    {title: "shots_on_goal_away_per_games", value: (stats.totalValues.away.shotsOnGoal / stats.totalValues.away.games).toFixed(1)},
  ]

  const shotsInsideValue = [
    {title: "shots_inside_box", value: stats.totalValues.shotsInsideBox},
    {title: "shots_inside_box_home", value: stats.totalValues.home.shotsInsideBox},
    {title: "shots_inside_box_away", value: stats.totalValues.away.shotsInsideBox},
    {title: "shots_inside_box_per_games", value: (stats.totalValues.shotsInsideBox / stats.totalValues.goals).toFixed(1)},
    {title: "shots_inside_box_home_per_games", value: (stats.totalValues.home.shotsInsideBox / stats.totalValues.home.games).toFixed(1)},
    {title: "shots_inside_box_away_per_games", value: (stats.totalValues.away.shotsInsideBox / stats.totalValues.away.games).toFixed(1)},
  ]

  const shotsOutsideValue = [
    {title: "shots_outside_box", value: stats.totalValues.shotOutsideBox},
    {title: "shots_outside_box_home", value: stats.totalValues.home.shotOutsideBox},
    {title: "shots_outside_box_away", value: stats.totalValues.away.shotOutsideBox},
    {title: "shots_outside_box_per_games", value: (stats.totalValues.shotOutsideBox / stats.totalValues.goals).toFixed(1)},
    {title: "shots_outside_box_home_per_games", value: (stats.totalValues.home.shotOutsideBox / stats.totalValues.home.games).toFixed(1)},
    {title: "shots_outside_box_away_per_games", value: (stats.totalValues.away.shotOutsideBox / stats.totalValues.away.games).toFixed(1)},
  ]

  const passesValue = [
    {title: "passes", value: stats.totalValues.passesTotal},
    {title: "passes_home", value: stats.totalValues.home.passesTotal},
    {title: "passes_away", value: stats.totalValues.away.passesTotal},
    {title: "passes_per_goal", value: (stats.totalValues.passesTotal / stats.totalValues.goals).toFixed(1)},
    {title: "passes_home_per_goal", value: (stats.totalValues.home.passesTotal / stats.totalValues.home.goals).toFixed(1)},
    {title: "passes_away_per_goal", value: (stats.totalValues.away.passesTotal / stats.totalValues.away.goals).toFixed(1)},
    {title: "passes_per_games", value: (stats.totalValues.passesTotal / stats.totalValues.goals).toFixed(1)},
    {title: "passes_home_per_games", value: (stats.totalValues.home.passesTotal / stats.totalValues.home.games).toFixed(1)},
    {title: "passes_away_per_games", value: (stats.totalValues.away.passesTotal / stats.totalValues.away.games).toFixed(1)},
  ]

  const passesAccurateValue = [
    {title: "passes_accurate", value: stats.totalValues.passesAccurate},
    {title: "passes_accurate_home", value: stats.totalValues.home.passesAccurate},
    {title: "passes_accurate_away", value: stats.totalValues.away.passesAccurate},
    {title: "passes_accurate_per_goal", value: (stats.totalValues.passesAccurate / stats.totalValues.goals).toFixed(1)},
    {title: "passes_accurate_home_per_goal", value: (stats.totalValues.home.passesAccurate / stats.totalValues.home.goals).toFixed(1)},
    {title: "passes_accurate_away_per_goal", value: (stats.totalValues.away.passesAccurate / stats.totalValues.away.goals).toFixed(1)},
    {title: "passes_accurate_per_games", value: (stats.totalValues.passesAccurate / stats.totalValues.goals).toFixed(1)},
    {title: "passes_accurate_home_per_games", value: (stats.totalValues.home.passesAccurate / stats.totalValues.home.games).toFixed(1)},
    {title: "passes_accurate_away_per_games", value: (stats.totalValues.away.passesAccurate / stats.totalValues.away.games).toFixed(1)},
  ]


  const cornersValue = [
    {title: "corners", value: stats.totalValues.corners},
    {title: "corners_home", value: stats.totalValues.home.corners},
    {title: "corners_away", value: stats.totalValues.away.corners},
    {title: "corners_per_games", value: (stats.totalValues.corners / stats.totalValues.games).toFixed(1)},
    {title: "corners_home_per_games", value: (stats.totalValues.home.corners / stats.totalValues.home.games).toFixed(1)},
    {title: "corners_away_per_games", value: (stats.totalValues.away.corners / stats.totalValues.away.games).toFixed(1)},
  ]

  const savesValue = [
    {title: "saves", value: stats.totalValues.saves},
    {title: "saves_home", value: stats.totalValues.home.saves},
    {title: "saves_away", value: stats.totalValues.away.saves},
    {title: "saves_per_games", value: (stats.totalValues.saves / stats.totalValues.games).toFixed(1)},
    {title: "saves_home_per_games", value: (stats.totalValues.home.saves / stats.totalValues.home.games).toFixed(1)},
    {title: "saves_away_per_games", value: (stats.totalValues.away.saves / stats.totalValues.away.games).toFixed(1)},
  ]

  const foulsValue = [
    {title: "fouls", value: stats.totalValues.fouls},
    {title: "fouls_home", value: stats.totalValues.home.fouls},
    {title: "fouls_away", value: stats.totalValues.away.fouls},
    {title: "fouls_per_games", value: (stats.totalValues.fouls / stats.totalValues.games).toFixed(1)},
    {title: "fouls_home_per_games", value: (stats.totalValues.home.fouls / stats.totalValues.home.games).toFixed(1)},
    {title: "fouls_away_per_games", value: (stats.totalValues.away.fouls / stats.totalValues.away.games).toFixed(1)},
  ]

  const offsidesValue = [
    {title: "offsides", value: stats.totalValues.offsides},
    {title: "offsides_home", value: stats.totalValues.home.offsides},
    {title: "offsides_away", value: stats.totalValues.away.offsides},
    {title: "offsides_per_games", value: (stats.totalValues.offsides / stats.totalValues.games).toFixed(1)},
    {title: "offsides_home_per_games", value: (stats.totalValues.home.offsides / stats.totalValues.home.games).toFixed(1)},
    {title: "offsides_away_per_games", value: (stats.totalValues.away.offsides / stats.totalValues.away.games).toFixed(1)},
  ]

  const yellowValue = [
    {title: "yellow_cards", value: stats.totalValues.yellowCard},
    {title: "yellow_cards_home", value: stats.totalValues.home.yellowCard},
    {title: "yellow_cards_away", value: stats.totalValues.away.yellowCard},
    {title: "yellow_cards_per_game", value: (stats.totalValues.yellowCard / stats.totalValues.games).toFixed(1)},
    {title: "yellow_cards_home_per_game", value: (stats.totalValues.home.yellowCard / stats.totalValues.home.games).toFixed(1)},
    {title: "yellow_cards_away_per_game", value: (stats.totalValues.away.yellowCard / stats.totalValues.away.games).toFixed(1)},
  ]

  const redValue = [
    {title: "red_cards", value: stats.totalValues.redCard},
    {title: "red_cards_home", value: stats.totalValues.home.redCard},
    {title: "red_cards_away", value: stats.totalValues.away.redCard},
    {title: "red_cards_per_games", value: (stats.totalValues.redCard / stats.totalValues.games).toFixed(1)},
    {title: "red_cards_home_per_games", value: (stats.totalValues.home.redCard / stats.totalValues.home.games).toFixed(1)},
    {title: "red_cards_away_per_games", value: (stats.totalValues.away.redCard / stats.totalValues.away.games).toFixed(1)},
  ]

  const dataToShow = [
    matchesValue,
    goalsValues,
    shotsValue,
    shotsOnGoalValue,
    shotsInsideValue,
    shotsOutsideValue,
    passesValue,
    passesAccurateValue,
    cornersValue,
    savesValue,
    foulsValue,
    offsidesValue,
    yellowValue,
    redValue
  ]

  return (
    <div className={c.wrap}>
      {
        dataToShow.map(items => (
          <div key={Math.random().toString()}>
            <div key={Math.random().toString()}>
              {
                items.map((item, index) => (
                  <ClubStatsField
                    key={Math.random().toString()}
                    title={intl.formatMessage({id: item.title})}
                    value={item.value}
                    isTransparent={index % 2 !== 0}
                  />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export {
  ClubStatsMore
}