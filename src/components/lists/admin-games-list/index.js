import React, {useEffect, useState} from "react";
import {Loading} from "../../cruspher-ui/loading";
import {getGamesRequest} from "../../../actions/games";
import {toast} from "react-toastify";
import {useIntl} from "react-intl";
import {GameListPagination} from "../game-list-pagination";
import {EmptyTitle} from "../../cruspher-ui/empty-title";
import {APPRoutes} from "../../../const/APP-routes";


const AdminGamesList = () => {
  const intl = useIntl()
  const notify = (text) => toast(text);
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [gameList, setGamesList] = useState({
    length: 0,
    data: []
  })

  useEffect(() => {
    gamesRequestHandler(page)
  }, [page])


  const gamesRequestHandler = async (pageValue) => {
    setIsLoading(true)

    const gamesToSet =  await getGamesRequest(pageValue)

    if (gamesToSet) {
      setGamesList({
        data: gamesToSet.data,
        length: gamesToSet.length
      })
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }


  if (isLoading) return <Loading />

  const body =
    gameList.length
      ? <GameListPagination link={APPRoutes.updateGame} page={page} setPage={setPage} games={gameList} />
      : <EmptyTitle errorText={intl.formatMessage({id: "list_is_empty"})} />


  return (
    <>
      {body}
     </>
  )
}


export {AdminGamesList}
