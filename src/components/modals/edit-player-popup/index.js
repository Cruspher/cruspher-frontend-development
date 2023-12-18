import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {PlayerAvatarUpload} from "../../cruspher-ui/formik/player-avatar-upload";
import {FormikField} from "../../cruspher-ui/formik/formik-field";
import {FormikSelect} from "../../cruspher-ui/formik/formik-select";
import {Modal} from "../../cruspher-ui/modal";
import {playerSchema} from "./player.schema";
import c from "./style.module.scss";
import {useIntl} from "react-intl";
import {FormikTitleWrap} from "../../cruspher-ui/formik/formik-title-wrap";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";
import {Loading} from "../../cruspher-ui/loading";
import {
  editPlayerRequest,
} from "../../../actions/players";

const EditPlayerPopup = ({toggleModal, activePlayer, changePlayerStatusHandler, changePlayer, shopElements, isInClub}) => {
  const intl = useIntl()
  const notify = text => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const addPlayerForm = useFormik({
    initialValues:{
        image: activePlayer.image,
        nameAPI: activePlayer.nameAPI,
        name: activePlayer.name,
        surname: activePlayer.surname,
        number: activePlayer.number,
        position: {
          value: activePlayer.position.toLowerCase(),
          title: intl.formatMessage({id: activePlayer.position.toLowerCase()})
        },
      },
    validationSchema: playerSchema,
    onSubmit: () => editPlayerHandler()
  })
  const [positionArray, setPositionArray] = useState([])


  useEffect(() => {
    const positionValuesToChoose = [
      {
        value: 'goalkeeper',
        title: intl.formatMessage({id: 'goalkeeper'})
      },
      {
        value: 'defender',
        title: intl.formatMessage({id: 'defender'})
      },
      {
        value: 'midfielder',
        title: intl.formatMessage({id: 'midfielder'})
      },
      {
        value: 'attacker',
        title: intl.formatMessage({id: 'attacker'})
      }
    ]

    setPositionArray(positionValuesToChoose)
  }, [])

  const editPlayerHandler = async () => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('name', addPlayerForm.values.name)
    formData.append('surname', addPlayerForm.values.surname)
    formData.append('number', addPlayerForm.values.number)
    formData.append('position', addPlayerForm.values.position.value)
    formData.append('image', addPlayerForm.values.image)
    formData.append('id', activePlayer.id)

    const editedPlayer = await editPlayerRequest(formData)

    if (editedPlayer) {
      editedPlayer.playerStatisticId = editedPlayer.playerStatisticId * 1

      changePlayer(editedPlayer)
      notify(intl.formatMessage({id: 'player_successfully_updated'}))
      toggleModal()
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const isNameFalse = !activePlayer.name && !activePlayer.surname && (
    <div className={c.apiName}>
      {activePlayer.nameAPI}
    </div>
  )


  const body = isLoading ? (
    <Loading/>
  ) : (
    <div className={c.addPlayerContainer}>
      {isNameFalse}

      <PlayerAvatarUpload shopElements={shopElements} value={addPlayerForm.values.image} form={addPlayerForm}/>

      <div className={c.formContainer}>
        <FormikTitleWrap title={intl.formatMessage({id: "name"})}>
          <FormikField
            submit={addPlayerForm.handleChange}
            form={addPlayerForm}
            value={addPlayerForm.values.name}
            name='name'
            placeholder={intl.formatMessage({id: "name"})}
          />
        </FormikTitleWrap>

        <FormikTitleWrap title={intl.formatMessage({id: "surname"})}>
          <FormikField
            submit={addPlayerForm.handleChange}
            form={addPlayerForm}
            value={addPlayerForm.values.surname}
            name='surname'
            placeholder={intl.formatMessage({id: "surname"})}
          />
        </FormikTitleWrap>

        <FormikTitleWrap title={intl.formatMessage({id: "number"})}>
          <FormikField
            submit={addPlayerForm.handleChange}
            form={addPlayerForm}
            value={addPlayerForm.values.number}
            name='number'
            placeholder={intl.formatMessage({id: "number"})}
          />
        </FormikTitleWrap>

        <FormikTitleWrap title={intl.formatMessage({id: "position"})}>
          <FormikSelect
            options={positionArray}
            form={addPlayerForm}
            value={addPlayerForm.values.position}
            name='position'
            placeholder={intl.formatMessage({id: "choose_position"})}
            labelValue='title'
          />
        </FormikTitleWrap>



        <div className={c.buttonWrapper}>
          <NeonButton big={true} variant='add' submit={() => addPlayerForm.handleSubmit()}>
            {intl.formatMessage({id: "edit"})}
          </NeonButton>

          {
            activePlayer && (
              <NeonButton
                big={true}
                variant={isInClub ? 'remove' : 'default'}
                submit={() => changePlayerStatusHandler(activePlayer.id, !isInClub)}
              >
                {intl.formatMessage({id: isInClub ? 'leave_the_club' : 'return_to_club'})}
              </NeonButton>
            )
          }
        </div>
      </div>
    </div>
  )


  return (
    <Modal padding='0px 20px' toggleModal={toggleModal}>
      {body}
    </Modal>
  )
}


export {
  EditPlayerPopup
}

