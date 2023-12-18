import React, {useContext, useEffect, useState} from 'react'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {UserGameAdditional} from "../user-game-additional";
import {addRateRequest, editRateRequest} from "../../../../../actions/games";
import {NeonButton} from "../../../../cruspher-ui/buttons/neon-button";
import {Lineups} from "../../../../lineups";
import {FORMATIONS_DATA} from "../../../../../data/formations.data";
import {
  gameRoleToPositionHelper,
  updateGameGridValuesHelper
} from "../../../../../helpers/games";
import {AuthContext} from "../../../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {Loading} from "../../../../cruspher-ui/loading";
import {GameHeader} from "../../../game-header";
import c from './style.module.scss'
import {addAndEditRateValidator} from "../../../../../helpers/validators/add-and-edit-rate.validator";
import {GridBox} from "../../../../cruspher-ui/box/grid-box";
import {FlexBox} from "../../../../cruspher-ui/box/flexbox";

const initialCaptains = {
  defender: null,
  midfielder: null,
  attacker: null
}

const UserGameLineup = ({gameResult, rateResult, players, getGameDataHandler, shopElements}) => {
  const auth = useContext(AuthContext)
  const userId = jwtDecode(auth.token).userId
  const intl = useIntl()
  const notify = text => toast(text)
  const [isHaveRate, setIsHaveRate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activePosition, setActivePosition] = useState('')
  const [activePlayerItem, setActivePlayerItem] = useState(null)
  const [formationPage, setFormationPage] = useState(0)
  const [formationList, setFormationList] = useState([])
  const [isCanAddRate] = useState(Date.now() - new Date(gameResult.stats.date).getTime() > -7200000)
  const [haveTimeToRate] = useState(((Date.now() - new Date(gameResult.stats.date).getTime()) / 1000 / 60 / 60) * -1)

  const [formation, setFormation] = useState(FORMATIONS_DATA[0])
  const [form, setForm] = useState(null)
  const [captainsForm, setCaptainsForm] = useState(initialCaptains)

  const [additionalForm, setAdditionalForm] = useState({
    shots: [1],
    successShots: [1],
    passes: [1],
    successPasses: [1],
    ballAccuracy: [1],
    dribbles: [1],
    successDribbles: [1]
  })

  useEffect(() => {
    if (rateResult.stats.shots) {
      updateFormValuesHandler()
    }
  }, [])

  useEffect(() => {
    updateLineupWithFormation()
  }, [formation])

  useEffect(() => {
    const newFormation = FORMATIONS_DATA.filter((item, index) => {
      return index >= formationPage && index < formationPage + 3
    })
    setFormationList(newFormation)
  }, [formationPage])


  const updateLineupWithFormation = () => {
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

    setCaptainsForm(initialCaptains)

    setForm(updateGameGridValuesHelper(newValue))
  }

  const sendFormHandler = () => {
    if (!isHaveRate) {
      addRateHandler()
    } else {
      editRateHandler()
    }
  }

  const editRateHandler = async () => {
    setIsLoading(true)

    const formToSend = {
      gameId: gameResult.stats.id,
      shots: additionalForm.shots[0],
      successShots: additionalForm.successShots[0],
      passes: additionalForm.passes[0],
      successPasses: additionalForm.successPasses[0],
      ballAccuracy: additionalForm.ballAccuracy[0],
      dribbles: additionalForm.dribbles[0],
      successDribbles: additionalForm.successDribbles[0],
      rateId: rateResult.stats.id,
      formation: formation.name
    }

    const captainsToSend = []
    const lineupsToSend = []

    Object.keys(captainsForm).forEach(item => {
      captainsToSend.push({
        playerId: captainsForm[item],
        position: item
      })
    })

    Object.keys(form).forEach(item => {
      lineupsToSend.push({
        playerId: form[item].id,
        position: form[item].role
      })
    })

    const error = addAndEditRateValidator(
      {
        stats: formToSend,
        captains: captainsToSend,
        lineup: lineupsToSend
      }
    )

    if (error) {
      setIsLoading(false)
      return notify(error)
    }

    const savedRate = await editRateRequest({
      ...formToSend,
      captains: captainsToSend,
      lineups: lineupsToSend
    })

    if (savedRate) {
      notify(intl.formatMessage({id: "rate_success_edited"}))
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const addRateHandler = async () => {
    setIsLoading(true)

    const formToSend = {
      shots: additionalForm.shots[0],
      successShots: additionalForm.successShots[0],
      passes: additionalForm.passes[0],
      successPasses: additionalForm.successPasses[0],
      ballAccuracy: additionalForm.ballAccuracy[0],
      dribbles: additionalForm.dribbles[0],
      successDribbles: additionalForm.successDribbles[0],
      userId: userId,
      gameId: gameResult.stats.id,
      formation: formation.name
    }

    const captainsToSend = []
    const lineupsToSend = []

    Object.keys(captainsForm).forEach(item => {
      captainsToSend.push({
        playerId: captainsForm[item],
        position: item
      })
    })

    Object.keys(form).forEach(item => {
      lineupsToSend.push({
        playerId: form[item].id,
        position: form[item].role
      })
    })


    const error = addAndEditRateValidator(
      {
        stats: formToSend,
        captains: captainsToSend,
        lineup: lineupsToSend
      }
    )

    if (error) {
      setIsLoading(false)
      return notify(error)
    }


    const savedData = await addRateRequest({
      ...formToSend,
      captains: captainsToSend,
      lineups: lineupsToSend
    })

    if (savedData) {
      notify(intl.formatMessage({id: "rate_success_added"}))
      getGameDataHandler()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const setPlayerHandler = (player, role) => {
    const newForm = {
      ...form
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


    setForm(updateGameGridValuesHelper(newForm))
    setActivePosition('')
  }

  const removePlayerFormLineupHandler = (role, player) => {
    const newForm = {
      ...form
    }

    newForm[role] = {
      name: '',
      surname: '',
      position: gameRoleToPositionHelper(role),
      number: '',
      avatar: null,
      role: role,
      id: ''
    }

    Object.keys(captainsForm).forEach(item => {
      if (captainsForm[item] === player.id) {
        captainsForm[item] = null
      }
    })


    setForm(updateGameGridValuesHelper(newForm))
    setActivePosition('')
  }

  const setActivePositionHandler = (item) => {
    setActivePosition({
      position: item.position,
      role: item.role
    })
    setActivePlayerItem(null)
  }

  const updateFormValuesHandler = () => {
    if (!rateResult.stats.shots) return
    setIsHaveRate(true)

    let gameFormationIndex = 0;
    console.log(rateResult.stats.formation, 'rateResult.stats.formation')
    const newFormation = FORMATIONS_DATA.filter((item, index) => {
      console.log(item.name,index, 'index')
      if (item.name === rateResult.stats.formation) {
        gameFormationIndex = index
      }
      return item.name === rateResult.stats.formation
    })[0]


    console.log(gameFormationIndex, 'gameFormationIndex')

    const newAdditionalForm = {
      shots: [rateResult.stats.shots],
      successShots: [rateResult.stats.successShots],
      passes: [rateResult.stats.passes],
      successPasses: [rateResult.stats.successPasses],
      ballAccuracy: [rateResult.stats.ballAccuracy],
      dribbles: [rateResult.stats.dribbles],
      successDribbles: [rateResult.stats.successDribbles]
    }


    const captainsToSet = {
      defender: rateResult.captains.defender.id,
      midfielder: rateResult.captains.midfielder.id,
      attacker: rateResult.captains.attacker.id
    }

    setCaptainsForm(captainsToSet)
    setFormation(newFormation)
    setAdditionalForm(newAdditionalForm)
    setFormationPage(gameFormationIndex)
    setTimeout(() => {
      setForm(updateGameGridValuesHelper(rateResult.lineup))
    }, 300)
  }


  if (isLoading) return <Loading/>

  return (
    <div className={c.wrap}>
      <GameHeader editable={true} gameStats={gameResult.stats} />

      <Lineups
        players={players}
        shopElements={shopElements}
        isDisabled={false}
        {
          ...{
            formationList,
            form,
            formation,
            setFormation,
            formationPage,
            setFormationPage,
            activePosition,
            setActivePositionHandler,
            removePlayerFormLineupHandler,
            captainsForm,
            setCaptainsForm,
            activePlayerItem,
            setActivePlayerItem,
            isLoading,
            setPlayerHandler,
          }
        }
      />

      <UserGameAdditional
        additionalForm={additionalForm}
        setAdditionalForm={setAdditionalForm}
      />

      <GridBox rowGap="18px">
        <NeonButton isDisabled={isCanAddRate} center={true} variant='add' submit={() => sendFormHandler()}>
          {!isHaveRate ? 'Save' : "Edit"}
        </NeonButton>

        {
          haveTimeToRate > 2 && (
            <FlexBox content='center'>
              <span className={c.time}>{(haveTimeToRate - 2).toFixed()} {intl.formatMessage({id: 'hours_left_to_add_rate'})}</span>
            </FlexBox>
          )
        }
      </GridBox>
    </div>
  )
}


export {
  UserGameLineup
}