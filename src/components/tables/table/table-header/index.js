import React from 'react';
import c from './style.module.scss'


const TableHeader = ({configData, rowColumns}) => {

  return (
    <div className={c.container} style={{gridTemplateColumns: rowColumns}}>
      {
        configData.map(({title, type, color},  index) => (
          <div key={index} style={{color: color ? color : 'silver'}}>
            {title}
          </div>
        ))
      }
    </div>
  )
}


export {
  TableHeader
}
