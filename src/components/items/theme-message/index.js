import React, {useContext, useState} from 'react'
import c from './style.module.scss'
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {useFormik} from "formik";
import {FormikAreaField} from "../../cruspher-ui/formik/formik-textarea";
import {
  addMessageReportRequest, editThemeMessageRequest,
  removeThemeMessageRequest
} from "../../../actions/forum";
import {AuthContext} from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {toast} from "react-toastify";
import {Dislike, Like} from "../../cruspher-ui/icons/emotions";
import {useIntl} from "react-intl";
import {DateView} from "../../cruspher-ui/date-view";
import {EditIcon, RemoveIcon, ReportIcon} from "../../cruspher-ui/icons/default";
import {ButtonDefault} from "../../cruspher-ui/buttons/button-default";


const ThemeMessage = ({message, loadMessage, setPage, allLength, addEmotionHandler, page}) => {
  const auth = useContext(AuthContext)
  const intl = useIntl()
  const userId = jwtDecode(auth.token).userId
  const role = jwtDecode(auth.token).role
  const notify = (text) => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditTrue, setEditTrue] = useState(false)
  const form = useFormik({
    initialValues: {
      message: message.message
    }
  })
  const [isReportLoading, setIsReportLoading] = useState(false)

  const toggleEdit = () => setEditTrue(!isEditTrue)

  const editMessageHandler = async () => {
    if (isLoading) return
    setIsLoading(true)
    const data = await editThemeMessageRequest({
      messageId: message.id,
      message: form.values.message
    })

    if (data) {
      await loadMessage()
      setEditTrue(false)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const removeThemeMessageHandler = async () => {
    if (isLoading) return
    setIsLoading(true)

    const removedMessage = await removeThemeMessageRequest(message.id)

    if (removedMessage) {
      if (allLength === 1) {
        if (page === 0) return setIsLoading(false)
        setPage(prev => prev -1)
      } else {
        await loadMessage()
      }
    }

    setIsLoading(false)
  }

  const addReportHandler = async (id) =>{
    if (isReportLoading) return
    setIsReportLoading(true)

    const data = await addMessageReportRequest(id)

    if (data) {
      notify(intl.formatMessage({id: 'report_success_added'}))
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsReportLoading(false)
  }

  const addLikeHandler = () => {
    addEmotionHandler({messageId: message.id, emotion: 'like'})
  }

  const addDislikeHandler = () => {
    addEmotionHandler({messageId: message.id, emotion: 'dislike'})
  }

  const header = (
    <div className={c.header}>
      <span className={c.name}>{message.user.name + ' ' + message.user.surname}</span>

      <DateView date={message.date} format='DD/MM HH:mm' />
    </div>
  )

  const footer = (
    <div className={c.footer}>
      {
        isEditTrue ? (
          <div className={c.buttonWrap}>
            <ButtonDefault submit={() => editMessageHandler()} variant='add' text={intl.formatMessage({id: "save"})} />
          </div>
        ) : (
          <FlexBox items='center' content='flex-end' columnGap='10px'>
            {
              userId === message.user.id && <EditIcon submit={toggleEdit} />
            }
            {
              (role === 'admin' || userId === message.userId)  && <RemoveIcon submit={removeThemeMessageHandler} />
            }
            <ReportIcon submit={() => addReportHandler(message.id)} />
            <Like submit={addLikeHandler} count={message.like} />
            <Dislike submit={addDislikeHandler} count={message.dislike} />
          </FlexBox>
        )
      }
    </div>
  )


  const messageContent = (
    <div className={c.message}>
      {
        isEditTrue ? (
          <FormikAreaField rows='5' value={form.values.message} form={form} submit={form.handleChange} name='message' />
        ) : (
          <p dangerouslySetInnerHTML={{__html: message.message.replace(/\n/g, "<br />")}} />
        )
      }
    </div>
  )

  return (
    <div className={c.container}>
      {header}

      {messageContent}

      {footer}
    </div>
  )
}


export {
  ThemeMessage
}
