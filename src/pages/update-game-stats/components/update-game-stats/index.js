import React, {useContext, useEffect, useState} from 'react'
import c from './style.module.scss'
import {NeonButton} from "../../../../components/cruspher-ui/buttons/neon-button";
import {addGameStatsRequest, getGameByIdRequest, getStatsRequest} from "../../../../actions/games";
import {UpdateGameStatsWrap} from "../update-game-stats-wrap";
import {toast} from "react-toastify";
import {useIntl} from "react-intl";
import {UpdateGamePlayers} from "../update-game-players";
import {Lineups} from "../../../../components/lineups";
import {FORMATIONS_DATA} from "../../../../data/formations.data";
import {gameRoleToPositionHelper, updateGameGridValuesHelper} from "../../../../helpers/games";
import {Loading} from "../../../../components/cruspher-ui/loading";
import {GameHeader} from "../../../../components/items/game-header";
import {checkGameWithStatsAndRatingsValidator} from "../../../../helpers/validators/update-game.validator";
import {usePlayersForm} from "../../../../hooks/use-players-form.hook";
import {sortByRating} from "../../../../helpers/players";
import {AuthContext} from "../../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {FlexBox} from "../../../../components/cruspher-ui/box/flexbox";


const UpdateGameStats = () => {
  const intl = useIntl()
  const notify = (text) => toast(text)
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const playerFormData = usePlayersForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isHaveResult, setIsHaveResult] = useState(false)
  const [isResultLoaded, setIsResultLoaded] = useState(false)
  const [playersMaxValues, setPlayersMaxValue] = useState(null)
  const [activePosition, setActivePosition] = useState('')
  const [activePlayerItem, setActivePlayerItem] = useState(null)
  const [formation, setFormation] = useState(FORMATIONS_DATA[0])
  const [formationPage, setFormationPage] = useState(0)
  const [formationList, setFormationList] = useState([FORMATIONS_DATA[0], FORMATIONS_DATA[1], FORMATIONS_DATA[2]])
  const [shopElements, setShopElements] = useState(null)


  const [aboutGame, setAboutGame] = useState(null)
  const [ratingsValues, setRatingValues] = useState([])
  const [lineupForm, setLineupForm] = useState(null)
  const [players, setPlayers] = useState([])


  useEffect(() => {
    changeFormationHandler(formationPage)
  }, [formationPage])

  useEffect(() => {
    getGameDataHandler()
  }, [])


  useEffect(() => {
    updateFormWidthFormation()
  }, [formation])

  const changeFormationHandler = (page) => {
    const newFormation = FORMATIONS_DATA.filter((item, index) => {
      return index >= page && index < page + 3
    })
    setFormationList(newFormation)
  }

  const updateFormWidthFormation = () => {
    setActivePosition('')

    const newValue = {}

    formation.value.forEach(item => {
      newValue[item] = {
        name: '',
        surname: '',
        position: gameRoleToPositionHelper(item),
        number: null,
        avatar: '',
        role: item
      }
    })

    setLineupForm(updateGameGridValuesHelper(newValue))
  }

  const sendDataHandler = async (lineupsValue, playersStats, gameStats) => {
    if (isLoading) return
    setIsLoading(true)

    const error = checkGameWithStatsAndRatingsValidator({
      stats: gameStats,
      lineup: lineupsValue,
      ratings: playersStats
    })

    if (error) {
      setIsLoading(false)
      return notify(error)
    }


    setIsLoading(true)
    const lineupsToSend = []
    const gameStatsToSend = gameStats
    const playersStatisticsToSend = playersStats.map(player => {
      return {
        id: player.id,
        ...player.statistics
      }
    })

    Object.keys(lineupsValue).forEach(item => {
      lineupsToSend.push({
        playerId: lineupForm[item].id,
        role: lineupForm[item].role
      })
    })


    const formToSend = {
      gameId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] * 1,
      ...gameStatsToSend,
      formation: formation.name,
      lineups: lineupsToSend,
      ratings: playersStatisticsToSend
    }


    const data = await addGameStatsRequest(formToSend)

    if (data) {
      setIsHaveResult(true)
      notify(intl.formatMessage({id: 'success_updated'}))
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const getGameDataHandler = async () => {
    setIsLoading(true)

    const gameId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] * 1
    const playersFormId = playerFormData.getPlayerForm() * 1


    const data = await getGameByIdRequest({gameId, playersFormId, userId: userId})


    if (data) {
      setAboutGame(data.gameResult.stats)
      setShopElements(data.shopElements)

      if (data.gameResult.isGameEnd) {
        setIsHaveResult(true)
        setRatingValues(sortByRating(data.gameResult.ratings))
        setPlayersMaxValue(data.gameResult.gameStatsMaxValues)
        setLineupForm(updateGameGridValuesHelper(data.gameResult.lineup))


        let gameFormationIndex = 0;
        FORMATIONS_DATA.forEach((item, index) => {
          if (data.gameResult.stats.formation === item.name) {
            gameFormationIndex = index
          }
        })
        setFormationPage(gameFormationIndex)
      }

      setPlayers(data.players)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const getStatsHandler = async () => {
    setIsLoading(true)
    const data = await getStatsRequest({
      fixture: aboutGame.fixture,
      players: players
    })


    if (data) {
      setPlayersMaxValue(data.maxValues)
      setRatingValues(data.players)
      setAboutGame({
        ...aboutGame,
        ...data.gameStats
      })
      setPlayers(data.lineupPlayers)
      setIsResultLoaded(true)
    } else {
      notify(intl.formatMessage({id: "game_not_finish"}))
    }


    setIsLoading(false)
  }

  const setPlayerHandler = (player, role) => {
    const newForm = {
      ...lineupForm
    }

    newForm[role] = {
      name: player.name,
      surname: player.surname,
      position: gameRoleToPositionHelper(role),
      number: player.number,
      avatar: player.image,
      role: role,
      id: player.id
    }


    setLineupForm(updateGameGridValuesHelper(newForm))
    setActivePosition('')
  }

  const removePlayerFormLineupHandler = (role, player) => {
    const newForm = {
      ...lineupForm
    }

    newForm[role] = {
      name: '',
      surname: '',
      position: player.position.toLowerCase(),
      number: '',
      avatar: null,
      role: role,
      id: ''
    }

    setLineupForm(updateGameGridValuesHelper(newForm))
    setActivePosition('')
  }

  const setActivePositionHandler = (item) => {
    setActivePosition({
      position: item.position,
      role: item.role
    })
    setActivePlayerItem(null)
  }



  if (isLoading) return <Loading/>

  return (
    <div className={c.wrap}>
      {
        aboutGame && (
          <GameHeader editable={false} gameStats={aboutGame} />
        )
      }


      {
        !isHaveResult && (
          <FlexBox direction='column' items='center' rowGap='20px'>
            <NeonButton
              variant='add'
              submit={isResultLoaded ? () => sendDataHandler(lineupForm, ratingsValues, aboutGame) : getStatsHandler}
            >
              {isResultLoaded ? intl.formatMessage({id: 'save'}) : intl.formatMessage({id: 'load_data'}) }
            </NeonButton>
          </FlexBox>
        )
      }

      {
        (isHaveResult || isResultLoaded) && (
          <>
            <div className={isHaveResult && c.resultWrapActive}>
              <Lineups
                  shopElements={shopElements}
                  isDisabled={isHaveResult}
                  form={lineupForm}
                  {
                    ...{
                      formationList,
                      formation,
                      setFormation,
                      formationPage,
                      setFormationPage,
                      activePosition,
                      setActivePositionHandler,
                      removePlayerFormLineupHandler,
                      activePlayerItem,
                      setActivePlayerItem,
                      isLoading,
                      players,
                      setPlayerHandler,
                    }
                  }
              />
            </div>

            <div className={c.resultWrap}>
              <UpdateGameStatsWrap form={aboutGame}/>

              <UpdateGamePlayers
                players={ratingsValues}
                maxValues={playersMaxValues}
                shopElements={shopElements}
              />
            </div>
          </>
        )
      }

    </div>
  )
}

export {
  UpdateGameStats
}