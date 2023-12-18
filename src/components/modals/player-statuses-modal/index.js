import React, {useContext, useEffect, useState} from 'react'
import c from './style.module.scss'
import {Modal} from "../../cruspher-ui/modal";
import {Wrap} from "../../cruspher-ui/wrappers/wrap";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {Loading} from "../../cruspher-ui/loading";
import {GridBox} from "../../cruspher-ui/box/grid-box";
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import moment from "moment";
import {editStatusesRequest, getPlayersAndStatusesRequest} from "../../../actions/games";
import {StatusPositionSection} from "./components/status-position-section";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";


const PlayerStatusesModal = ({toggleModal, game, disabled}) => {
    const intl = useIntl()
    const auth = useContext(AuthContext)
    const {userId} = jwtDecode(auth.token)
    const [isLoading, setIsLoading] = useState(false)
    const [playersForm, setPlayerForm] = useState([])
    const [shopElements, setShopElements] = useState(null)

    useEffect(() => {
        getDataHandler()
    }, [])

    const notify = text => toast(text)

    const getDataHandler = async () => {
        if (isLoading) return
        setIsLoading(true)

        const data = await getPlayersAndStatusesRequest({gameId: game.id, userId})

        if (data) {
            setPlayerForm(data.players)
            setShopElements(data.shopElements)
        } else {
            notify(intl.formatMessage({id: "unknown_error"}))
        }

        setIsLoading(false)
    }

    const changePlayerValue = (playerId, value) => {
        const newForm = playersForm.map(player => {
            if (player.id === playerId) {
                player.status = value
            }

            return player
        })


        setPlayerForm(newForm)
    }

    const editStatusesHandler = async () => {
        if (disabled || isLoading) return
        setIsLoading(true)

        const statusesToSend = playersForm
            .filter(player => player.status !== 'ok')
            .map(player => {
                return {
                    playerId: player.id,
                    status: player.status
                }
            })

        const data = await editStatusesRequest({statuses: statusesToSend, gameId: game.id})

        if (data) {
            notify(intl.formatMessage({id: "success_edited"}))
        } else {
            notify(intl.formatMessage({id: "unknown_error"}))
        }

        setIsLoading(false)
    }


    const body = isLoading ? (
        <Loading/>
    ) : (
        <GridBox rowGap='30px'>
            <FlexBox items='center' columnGap='20px'>

                <FlexBox items='center' columnGap='10px'>
                    <img alt="" className={c.avatar} src={game.homeAvatar}/>
                    <img alt="" className={c.avatar} src={game.awayAvatar}/>
                </FlexBox>


                <span className={c.date}>
          {moment(game.date).format('DD/MM/YYYY H:mm')}
        </span>
            </FlexBox>

            {!disabled && (
                <NeonButton variant='add' submit={editStatusesHandler}>
                    {intl.formatMessage({id: 'save'})}
                </NeonButton>
            )}


            <GridBox rowGap='30px'>

                <StatusPositionSection
                    shopElements={shopElements}
                    players={playersForm}
                    position={'goalkeeper'}
                    changePlayerValue={changePlayerValue}
                    disabled={disabled}
                    title='goalkeepers'
                />

                <StatusPositionSection
                    shopElements={shopElements}
                    players={playersForm}
                    position='defender'
                    changePlayerValue={changePlayerValue}
                    disabled={disabled}
                    title='defenders'
                />

                <StatusPositionSection
                    shopElements={shopElements}
                    players={playersForm}
                    position={"midfielder"}
                    changePlayerValue={changePlayerValue}
                    disabled={disabled}
                    title={"midfielders"}
                />

                <StatusPositionSection
                    shopElements={shopElements}
                    players={playersForm}
                    position={"attacker"}
                    changePlayerValue={changePlayerValue}
                    disabled={disabled}
                    title={"attackers"}
                />

                <StatusPositionSection
                    shopElements={shopElements}
                    players={playersForm}
                    title={"missed_list"}
                    isMissedList={true}
                    changePlayerValue={changePlayerValue}
                    disabled={disabled}
                />
            </GridBox>
        </GridBox>
    )


    return (
        <Modal toggleModal={toggleModal} type='noPadding'>
            <Wrap vPadding='50px'>
                {body}
            </Wrap>
        </Modal>
    )
}


export {
    PlayerStatusesModal
}