import React from 'react'
import {TableRow} from "../table-row";
import {GridBox} from "../../../cruspher-ui/box/grid-box";



const TableBody = ({config, data, configData, rowColumns}) => {
  return (
    <GridBox rowGap='5px'>
      {
        data.map((team, index) => (
          <TableRow configData={configData} rowColumns={rowColumns} key={Math.random().toString()} {...{index, team, config}} />
        ))
      }
    </GridBox>
  )
}

export {
  TableBody
}
