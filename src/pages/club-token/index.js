import React from 'react'
import {LayoutDefault} from "../../components/layouts/layout-default";
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {PriceChart} from "./components/price-chart";


const ClubTokenPage = () => {

  return (
    <LayoutDefault>
      <Wrap  vPadding="30px">
        <PriceChart />
      </Wrap>
    </LayoutDefault>
  )
}


export  {
  ClubTokenPage
}