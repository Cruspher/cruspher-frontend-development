import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {AdminMenu} from "../../../components/admin-menu";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import c from './style.module.scss'
import {AdminGamesList} from "../../../components/lists/admin-games-list";
import {useIntl} from "react-intl";


const AdminGamesPage = () => {
  const intl = useIntl()


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <div className={c.wrap}>
          <AdminMenu name="games" />

          <PageTitle title={intl.formatMessage({id: 'games'})} />


          <AdminGamesList  />
        </div>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminGamesPage
}