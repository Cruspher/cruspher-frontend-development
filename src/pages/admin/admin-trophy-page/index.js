import React from 'react'
import {Wrap} from "../../../components/cruspher-ui/wrappers/wrap";
import {LayoutDefault} from "../../../components/layouts/layout-default";
import {AdminMenu} from "../../../components/admin-menu";
import {GridBox} from "../../../components/cruspher-ui/box/grid-box";
import {PageHeader} from "../../../components/items/page-header";
import {PageTitle} from "../../../components/cruspher-ui/title";
import {useIntl} from "react-intl";
import {TrophiesList} from "../../../components/lists/trophies-list";
import {useNavigate} from "react-router-dom";
import {APPRoutes} from "../../../const/APP-routes";
import {ButtonDefault} from "../../../components/cruspher-ui/buttons/button-default";


const AdminTrophyPage = () => {
  const intl = useIntl()
  const navigate = useNavigate()

  const viewTrophyHandler = (item) => {
    navigate(APPRoutes.editTrophy + item.id)
  }


  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <GridBox rowGap='30px'>
          <AdminMenu name='trophy' />

          <PageHeader>
            <PageTitle title={intl.formatMessage({id: 'trophies'})} />

            <ButtonDefault
              submit={() => navigate(APPRoutes.addTrophy)}
              text= {intl.formatMessage({id: 'add'})}
            />
          </PageHeader>

          <TrophiesList submit={viewTrophyHandler} />
        </GridBox>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  AdminTrophyPage
}