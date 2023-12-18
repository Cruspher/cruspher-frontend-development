import React, {useContext, useEffect, useState} from "react";
import {UserGameLineup} from "./components/user-game-lineup";
import {getGameByUserRequest} from "../../../actions/games";
import {toast} from "react-toastify";
import {useIntl} from "react-intl";
import {Loading} from "../../cruspher-ui/loading";
import {FinalGameStats} from "../final-game-stats";
import {updateGameGridValuesHelper} from "../../../helpers/games";
import {usePlayersForm} from "../../../hooks/use-players-form.hook";
import c from './style.module.scss'
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";


const UserGame = () => {
  const intl = useIntl()
  const notify = text => toast(text)
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const playerFormData = usePlayersForm()
  const [isLoading, setIsLoading] = useState(false)
  const [gameData, setGameData] = useState(null)
  const [rateResult, setRateResult] = useState(null)
  const [gameResult, setGameResult] = useState(null)
  const [players, setPlayers] = useState([])
  const [shopElements, setShopElements] = useState(null)



  useEffect(() => {
    getGameDataHandler()
  }, [])

  const getGameDataHandler = async () => {
    const gameId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    setIsLoading(true)

    const playersFormId = playerFormData.getPlayerForm() * 1

    const data = await getGameByUserRequest({userId, gameId: gameId * 1, playersFormId: playersFormId})

    if (data) {
      setGameData(data)
      setShopElements(data.shopElements)

      data.gameResult.lineup = updateGameGridValuesHelper(data.gameResult.lineup)
      data.rateResult.lineup = updateGameGridValuesHelper(data.rateResult.lineup)
      setRateResult(data.rateResult)
      setGameResult(data.gameResult)
      setPlayers(data.players)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }


    setIsLoading(false)
  }


  const body = isLoading || !gameData ? (
    <Loading />
  ) : (
    <>
      {
        gameResult.isGameEnd ? (
         <FinalGameStats
           rateResult={rateResult}
           gameResult={gameResult}
           gameData={gameData}
           shopElements={shopElements}
         />
        ) : (
          <UserGameLineup
            gameResult={gameResult}
            rateResult={rateResult}
            players={players}
            getGameDataHandler={getGameDataHandler}
            shopElements={shopElements}
          />
        )
      }
    </>
  )

  return (
    <div className={c.wrap}>
      {body}
    </div>
  )
}


export {
  UserGame
}