import React, {useEffect, useState} from 'react'
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {PageHeader} from "../../../components/items/page-header";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {useIntl} from "react-intl";
import {
  clearForumMessageReportsRequest,
  getForumLanguagesRequest,
  getMessageByReportRequest,
  removeThemeMessageRequest
} from "../../../actions/forum";
import {toast} from "react-toastify";
import { SelectDefault} from "../../../components/cruspher-ui/selects/select";
import {Loading} from "../../../components/cruspher-ui/loading";
import {GridBox} from "../../../components/cruspher-ui/box/grid-box";
import {EmptyTitle} from "../../../components/cruspher-ui/empty-title";
import {MessageReportItem} from "./components/message-report-item";
import {Pagination} from "../../../components/cruspher-ui/pagination";


const AdminForumReportPage = () => {
  const intl = useIntl()
  const [languages, setLanguages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState(null)
  const [messageList, setMessageList] = useState({data: [], length: 0})
  const [page, setPage] = useState(0)

  useEffect(() => {
    getLanguagesHandler()
  }, [])

  useEffect(() => {
    if (!activeLanguage) return

    getMessagesHandler()
  }, [activeLanguage, page])

  const notify = text => toast(text)

  const getMessagesHandler = async () => {
    setIsLoading(true)

    const data = await getMessageByReportRequest({page: page, languageId: activeLanguage.id})

    if (data) {
      setMessageList(data)
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const getLanguagesHandler = async () => {
    setIsLoading(true)

    const data = await getForumLanguagesRequest()

    if (data) {
      setIsLoading(false)

      setLanguages(data.languages)

      const activeLanguage = data.languages.filter(item => !!item.isDefault)
      setActiveLanguage(activeLanguage[0])
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  const removeThemeMessageHandler = async (id) => {
    if (isLoading) return
    setIsLoading(true)

    const removedMessage = await removeThemeMessageRequest(id)

    if (removedMessage) {
      setIsLoading(false)
      getMessagesHandler()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }

  const clearThemeMessageHandler = async (id) => {
    if (isLoading) return
    setIsLoading(true)

    const clearedMessage = await clearForumMessageReportsRequest(id)

    if (clearedMessage) {
      setIsLoading(false)
      getMessagesHandler()
    } else {
      notify(intl.formatMessage({id: "unknown_error"}))
    }

    setIsLoading(false)
  }


  const body = isLoading ? (
    <Loading />
  ) : (
    <GridBox rowGap='30px'>
      <PageHeader >
        <PageTitle title={intl.formatMessage({id: "forum_reports"})} />

        <SelectDefault
          value={activeLanguage}
          labelValue='name'
          submit={(language) => {
            setActiveLanguage(language)
            setPage(0)
          }}
          options={languages}
          maxWidth='200px'
        />
      </PageHeader>

      {
        messageList.data.length ? (
          <GridBox rowGap='30px'>
            {messageList.data.map(item => (
              <MessageReportItem
                item={item}
                removeThemeMessageHandler={removeThemeMessageHandler}
                key={item.id}
                clearThemeMessageHandler={clearThemeMessageHandler}
              />
            ))}
          </GridBox>
        ) : (
          <EmptyTitle errorText='list_is_empty' />
        )
      }

      {messageList.length > 20 && (
        <Pagination page={page + 1} onChangePage={setPage} length={messageList.length} rows={20} />
      )}
    </GridBox>
  )

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        {body}
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminForumReportPage
}