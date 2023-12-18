import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {AdminMenu} from "../../../components/admin-menu";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {AdminLevelsList} from "../../../components/lists/admin-levels-list";
import {useIntl} from "react-intl";
import {GridBox} from "../../../components/cruspher-ui/box/grid-box";


const AdminLevelsPage = () => {
  const intl = useIntl()

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <GridBox rowGap='30px'>
          <AdminMenu name='levels' />

          <PageTitle title={intl.formatMessage({id: "levels"})} />

          <AdminLevelsList />
        </GridBox>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminLevelsPage
}