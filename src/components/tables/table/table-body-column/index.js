import React from 'react'
import {FlexBox} from "../../../cruspher-ui/box/flexbox";

const TableBodyColumn = ({team, configItem}) => {

  const content =
    configItem.type === 'component'
      ?  configItem.component(team)
      : team[configItem.name]

  return (
    <FlexBox items='center'>
        {content}
    </FlexBox>
  )
}

export {
  TableBodyColumn
}
