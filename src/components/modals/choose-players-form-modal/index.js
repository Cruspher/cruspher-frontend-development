import React, {useEffect, useState} from 'react'
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {getFormsRequest} from "../../../actions/playersForm";
import {Loading} from "../../cruspher-ui/loading";
import {Modal} from "../../cruspher-ui/modal";
import {usePlayersForm} from "../../../hooks/use-players-form.hook";


const ChoosePlayersFormModal = ({toggleModal}) => {
  const intl = useIntl()
  const notify = (text) => toast(text)
  const playerFormData = usePlayersForm()
  const [isLoading, setIsLoading] = useState(false)
  const [forms, setForms] = useState([])
  const [activeFormId, setActiveFormId] = useState(0)


  useEffect(() => {
    getFormHandler()

    setActiveFormId(playerFormData.getPlayerForm())
  }, [])

  const getFormHandler = async () => {
    setIsLoading(true)

    const data = await getFormsRequest()

    if (data) {
      setForms(data.forms)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }


  const setFromIdHandler = (id) => {
    playerFormData.setPlayersForm(id)
    setActiveFormId(id)
  }

  if (isLoading) return <Loading />

  return (
    <Modal toggleModal={toggleModal} type='xs'>
      <div className={c.wrap}>
        {
          forms.map(item => (
            <div
              onClick={() => setFromIdHandler(item.id)}
              key={Math.random().toString()}
              className={activeFormId === item.id.toString() ? `${c.item} ${c.itemActive}` : c.item}
            >
              <h4 className={c.title}>{item.name}</h4>

              <div className={c.imageWrap}>
                <img className={c.formImage} src={process.env.REACT_APP_API_URL + item.image} alt=""/>
              </div>
            </div>
          ))
        }
      </div>
    </Modal>
  )
}


export {
  ChoosePlayersFormModal
}