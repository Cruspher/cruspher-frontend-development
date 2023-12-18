import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {AdminMenu} from "../../../components/admin-menu";
import {useNavigate} from "react-router-dom";
import {APPRoutes} from "../../../const/APP-routes";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {PageHeader} from "../../../components/items/page-header";
import {NewsList} from "../../../components/lists/news-list";
import c from './style.module.scss'
import {useIntl} from "react-intl";
import {ButtonDefault} from "../../../components/cruspher-ui/buttons/button-default";


const AdminNewsPage = () => {
  const intl = useIntl()
  const navigate = useNavigate()

  const addNewsHandler = () => {
    navigate(APPRoutes.addNews)
  }

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <div className={c.wrap}>
          <AdminMenu name='news' />

          <PageHeader>
            <PageTitle title={intl.formatMessage({id: "news"})} />

            <ButtonDefault submit={addNewsHandler} text={intl.formatMessage({id: "add"})} />
          </PageHeader>

          <NewsList isAdmin={true} />
        </div>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminNewsPage
}