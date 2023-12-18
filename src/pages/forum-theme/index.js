import React, {useContext, useEffect, useState} from 'react'
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import c from "./style.module.scss";
import {Pagination} from "../../components/cruspher-ui/pagination";
import {ThemeMessage} from "../../components/items/theme-message";
import {FormikAreaField} from "../../components/cruspher-ui/formik/formik-textarea";
import {useFormik} from "formik";
import {FlexBox} from "../../components/cruspher-ui/box/flexbox";
import {LayoutDefault} from "../../components/layouts/layout-default";
import {newMessageSchema} from "./message.schema";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {
  addMessageEmotionRequest,
  addThemeMessageRequest,
  getForumMessagesRequest
} from "../../actions/forum";
import {Loading} from "../../components/cruspher-ui/loading";
import {EmptyTitle} from "../../components/cruspher-ui/empty-title";
import {useNavigate} from "react-router-dom";
import {useIntl} from "react-intl";
import {ActionIcon} from "../../components/cruspher-ui/icons/default";
import {ButtonDefault} from "../../components/cruspher-ui/buttons/button-default";


const ForumTheme = () => {
  const [disabledLoading, setDisabledLoading] = useState(false)
  const intl = useIntl()
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const notify = (text) => toast(text)
  const userId = jwtDecode(auth.token).userId
  const newMessageForm = useFormik({
    initialValues: {
      message: ''
    },
    validationSchema: newMessageSchema,
    onSubmit: () => {
      addThemeMessageHandler()
    }
  })
  const [page, setPage] = useState(0)
  const [messageList, setMessageList] = useState(null)
  const [themeTitle, setThemeTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getMessagesHandler()
  }, [page])

  const getMessagesHandler = async () => {
    if (isLoading) return
    setIsLoading(true)
    const path = window.location.pathname
    const themeId = path.split('/')[path.split('/').length - 1]

    const data = await getForumMessagesRequest({page, themeId})

    if (data) {
      setMessageList({
        length: data.length,
        data: data.data,
      })

      if (!themeTitle) {
        setThemeTitle(data.theme)
      }
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }


    setIsLoading(false)
  }

  const getMessagesHandlerWithOutLoading = async () => {
    const path = window.location.pathname
    const themeId = path.split('/')[path.split('/').length - 1]

    const data = await getForumMessagesRequest({page, themeId})


    if (data) {
      setMessageList({
        length: data.length,
        data: data.data
      })
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }
  }

  const addThemeMessageHandler = async () => {
    if (disabledLoading) return
    setDisabledLoading(true)

    const path = window.location.pathname
    const themeId = path.split('/')[path.split('/').length - 1]
    const data = await addThemeMessageRequest({
      userId,
      themeId,
      message: newMessageForm.values.message
    })

    if (data) {
      if (messageList.data.length === 20) {
        await newMessageForm.setFieldValue('message', '')
        await newMessageForm.setTouched({})
        const newPage = page + 1
        setPage(newPage)
      } else {
        await getMessagesHandlerWithOutLoading()
        await newMessageForm.setFieldValue('message', '')
        await newMessageForm.setTouched({})
      }
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setDisabledLoading(false)
  }

  const addEmotionHandler = async ({emotion, messageId}) => {
    if (disabledLoading) return
    setDisabledLoading(true)

    const data = await addMessageEmotionRequest({
      messageId: messageId,
      userId: userId,
      emotion: emotion
    })

    if (data) {
      notify('emotion success added')
      const newData = messageList.data.map(item => {
        if (item.id === messageId) {
          if (data.oldEmotionName) {
            item[data.oldEmotionName] = item[data.oldEmotionName] - 1
          }
          item[emotion] = item[emotion] + 1
        }

        return item
      })

      setMessageList({
        ...messageList,
        data: newData
      })
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setDisabledLoading(false)
  }

  const body = isLoading ? (
    <Loading/>
  ) : (
    <Wrap vPadding='30px'>
      <div className={c.wrap}>
        <div className={c.headerContainer}>
          <ActionIcon submit={() => navigate(-1)} type='left' />
          <h2 className={c.title}>
             {themeTitle}
          </h2>
        </div>

        {
          messageList?.data.length ? (
            <div className={c.messageWrap}>
              {
                messageList?.data.map(item => (
                  <ThemeMessage
                    key={Math.random().toString()}
                    setPage={setPage}
                    allLength={messageList.length}
                    pageLength={messageList.data.length}
                    loadMessage={getMessagesHandlerWithOutLoading}
                    message={item}
                    addEmotionHandler={addEmotionHandler}
                    page={page}
                  />
                ))
              }
            </div>
          ) : (
            <EmptyTitle withoutPadding={true} errorText={intl.formatMessage({id: 'list_is_empty'})} />
          )
        }

        {
          messageList?.length > 20 && (
            <div>
              <Pagination
                page={page + 1} rows={20} onChangePage={(val) => setPage(val)} length={messageList.length}
              />
            </div>
          )
        }


        <div className={c.formWrap}>
          <FormikAreaField
            rows='5'
            name='message'
            placeholder={intl.formatMessage({id: 'message_text'})}
            form={newMessageForm}
            submit={newMessageForm.handleChange}
            value={newMessageForm.values.message}
          />

          <FlexBox content='flex-end'>
            <ButtonDefault
              submit={() => newMessageForm.submitForm()}
              text={intl.formatMessage({id: 'send'})}
            />
          </FlexBox>
        </div>
      </div>
    </Wrap>
  )


  return (
    <LayoutDefault>
      {body}
    </LayoutDefault>
  )
}

export {
  ForumTheme
}

