import React from 'react'
import {useIntl} from "react-intl";
import {LayoutDefault} from "../../components/layouts/layout-default";
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {GridBox} from "../../components/cruspher-ui/box/grid-box";
import {PageTitle} from "../../components/cruspher-ui/title";
import {TrophiesList} from "../../components/lists/trophies-list";


const TrophiesPage = () => {
  const intl = useIntl()

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <GridBox rowGap='30px'>
          <PageTitle title={intl.formatMessage({id: "trophies"})} />

          <TrophiesList />
        </GridBox>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  TrophiesPage
}