import React from 'react'
import c from "./style.module.scss";
import {TableBodyColumn} from "../table-body-column";

const getLaLigaRowContainer = (index) => {
  /*
    if (index < 4) {
    return `${c.containerBlue} ${c.container}`
  }
  if (index > 3 && index < 6 ) {
    return `${c.containerOrange} ${c.container}`
  }
  if (index === 6) {
    return `${c.containerGreen} ${c.container}`
  }

  if (index > 16) {
    return`${c.container} ${c.containerRed} `
  }
   */

  return c.container
}

const getChampionsLeagueRowContainer = (index) => {
  if (index < 2) {
    return `${c.containerBlue} ${c.container}`
  }
  if (index === 2) {
    return `${c.containerOrange} ${c.container}`
  }

  return c.container
}


const getClassName = (type, index) => {
  if (type === 'laLiga') return getLaLigaRowContainer(index)
  if (type === 'championsLeague') return getChampionsLeagueRowContainer(index)
}


const TableRow = ({index, config, team, configData, rowColumns}) => {

  const rowClass = getClassName(config.type, index)

  return (
    <div className={rowClass} style={{gridTemplateColumns: rowColumns}}>
      {
        configData.map((configItem) => (
          <TableBodyColumn key={Math.random().toString()} {...{configItem, team}} />
        ))
      }
    </div>
  )
}

export {
  TableRow
}
