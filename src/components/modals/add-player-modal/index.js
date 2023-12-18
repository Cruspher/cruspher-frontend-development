import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {PlayerAvatarUpload} from "../../cruspher-ui/formik/player-avatar-upload";
import {FormikField} from "../../cruspher-ui/formik/formik-field";
import {FormikSelect} from "../../cruspher-ui/formik/formik-select";
import {Modal} from "../../cruspher-ui/modal";
import c from "./style.module.scss";
import {useIntl} from "react-intl";
import {FormikTitleWrap} from "../../cruspher-ui/formik/formik-title-wrap";
import {NeonButton} from "../../cruspher-ui/buttons/neon-button";
import {Loading} from "../../cruspher-ui/loading";
import {
  addPlayerRequest
} from "../../../actions/players";
import {newPlayerSchema} from "./player.schema";

const AddPlayerModal = ({toggleModal, formImage}) => {
  const intl = useIntl()
  const notify = text => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const addPlayerForm = useFormik({
    initialValues:{
      image: null,
      name: '',
      surname: '',
      number: '',
      position: {
        value: '',
        title: ''
      },
    },
    validationSchema: newPlayerSchema,
    onSubmit: () => addPlayerHandler()
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

    addPlayerForm.setFieldValue('position', positionValuesToChoose[0])
    setPositionArray(positionValuesToChoose)
  }, [])

  const addPlayerHandler = async () => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('name', addPlayerForm.values.name)
    formData.append('surname', addPlayerForm.values.surname)
    formData.append('number', addPlayerForm.values.number)
    formData.append('position', addPlayerForm.values.position.value)
    formData.append('image', addPlayerForm.values.image)



    const newPlayer = await addPlayerRequest(formData)

    if (newPlayer) {

      notify(intl.formatMessage({id: 'player_successfully_added'}))
      toggleModal()
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }


  const body = isLoading ? (
    <Loading/>
  ) : (
    <div className={c.addPlayerContainer}>
      <PlayerAvatarUpload formImage={formImage} value={addPlayerForm.values.image} form={addPlayerForm}/>

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
  AddPlayerModal
}

