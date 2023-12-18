import React, {useContext, useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {EditPlayerPopup} from "../../modals/edit-player-popup";
import {Loading} from "../../cruspher-ui/loading";
import {editPlayerStatusRequest, getAllPlayersRequest, getPlayersInClubRequest} from "../../../actions/players";
import c from './style.module.scss'
import {PlayerCardWrap} from "../../items/player-card-wrap";
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {PageTitle} from "../../cruspher-ui/title";
import {FlipCheckbox} from "../../cruspher-ui/checkboxes";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {Pagination} from "../../cruspher-ui/pagination";


const PlayersList = () => {
  const intl = useIntl()
  const notify = (text) => toast(text)
  const auth = useContext(AuthContext)
  const {userId} = jwtDecode(auth.token)
  const [isModalShow, setIsModalShow] = useState(false)
  const [activePlayer, setActivePlayer] = useState(null)
  const [shopElements, setShopElements] = useState(null)
  const [players, setPlayers] = useState([])
  const [isPlayerLoading, setIsPlayerLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [isInClub, setIsInClub] = useState(true)

  useEffect(() => {
    getDataHandler()
  },[page, isInClub])

  const getDataHandler = () => {
    if (isInClub) {
      getPlayersHandler()
    } else {
      getAllPlayersHandler()
    }
  }

  const toggleModal = () => setIsModalShow(!isModalShow)


  const getPlayersHandler = async () => {
    setIsPlayerLoading(true)


    const data = await getPlayersInClubRequest({userId, page})

    if (data) {
      setPlayers({data: data.players, length: data.length})
      setShopElements(data.shopElements)
    }
    else notify(intl.formatMessage({id: 'unknown_error'}))

    setIsPlayerLoading(false)
  }

  const getAllPlayersHandler = async () => {
    setIsPlayerLoading(true)


    const data = await getAllPlayersRequest({userId, page})

    if (data) {
      setPlayers({data: data.players, length: data.length})
      setShopElements(data.shopElements)
    }
    else notify(intl.formatMessage({id: 'unknown_error'}))

    setIsPlayerLoading(false)
  }

  const changePlayer = (editedPlayer) => {
    setIsPlayerLoading(true)
    const newPlayersValue = players.data.map(player => {
      if (player.id === editedPlayer.id) return editedPlayer
      else return player
    })

    setPlayers({
      ...players,
      data: newPlayersValue
    })
    setIsPlayerLoading(false)
  }

  const changePlayerStatusHandler = async (playerId,status) => {
    setIsPlayerLoading(true)
    const changedPlayer = await editPlayerStatusRequest(
      {
        isInClub: status,
        playerId: playerId
      }
    )

    if (changedPlayer) {
      notify(intl.formatMessage({id: 'player_successfully_left_the_club'}))
      toggleModal()

      if (players.data.length === 1) {
        setPage(page - 1)
      } else {
        getDataHandler()
      }
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsPlayerLoading(false)
  }

  const editPlayerHandler = (newActivePlayer) => {
    setActivePlayer(newActivePlayer)
    toggleModal()
  }

  if (isPlayerLoading) return <Loading />

  const editPlayerModal = isModalShow && (
    <EditPlayerPopup
      toggleModal={toggleModal}
      shopElements={shopElements}
      isInClub={isInClub}
      {...{activePlayer,changePlayer,changePlayerStatusHandler}}
    />
  )


  return (
    <div className={c.wrap}>
      <GridBox rowGap='30px'>
        <FlexBox items='center' content='space-between'>
          <PageTitle title='Players' />

          <FlipCheckbox
            submit={(val) => {
              setPage(0)
              setIsInClub(val)
            }}
            value={isInClub}
          />
        </FlexBox>

        <PlayerCardWrap
          shopElements={shopElements}
          submit={editPlayerHandler}
          players={players}
          submitTitle={intl.formatMessage({id: 'edit'})}
        />

        <Pagination page={page + 1} rows={18} length={players.length} onChangePage={setPage} />

        {editPlayerModal}
      </GridBox>
    </div>
  )
}


export {PlayersList}
