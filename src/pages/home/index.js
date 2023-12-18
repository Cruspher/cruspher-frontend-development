import React from 'react'
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {LayoutDefault} from "../../components/layouts/layout-default";
import {UserRatingListSection} from "./components/user-rating-list-section";
import {HomeUserData} from "./components/home-user-data";
import {GridBox} from "../../components/cruspher-ui/box/grid-box";

const HomePage = () => {

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <GridBox rowGap='50px'>
          <HomeUserData />

          <UserRatingListSection />
        </GridBox>
      </Wrap>
    </LayoutDefault>
  )
}


export {
  HomePage
}
