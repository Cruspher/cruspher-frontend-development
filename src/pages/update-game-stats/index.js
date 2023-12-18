import React from 'react'
import {Wrap} from "../../components/cruspher-ui/wrappers/wrap";
import {LayoutDefault} from "../../components/layouts/layout-default";
import {UpdateGameStats} from "./components/update-game-stats";


const UpdateGameStatsPage = () => {

  return (
    <LayoutDefault>
      <Wrap vPadding='30px'>
        <UpdateGameStats />
      </Wrap>
    </LayoutDefault>
  )
}

export {
  UpdateGameStatsPage
}