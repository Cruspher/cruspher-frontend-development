import React from 'react'
import {TableBody} from "./table-body";
import {TableHeader} from "./table-header";
import c from './style.module.scss'


const Table = ({config, data}) => {

  return (
    <div className={c.block}>
      <div className={c.container}>
        <TableHeader rowColumns={config.rowColumnsFixed} configData={config.fixedData} />
        <TableBody
          rowColumns={config.rowColumnsFixed}
          configData={config.fixedData}
          {...{data, config}}
        />
      </div>
      <div className={c.scrollBlock}>
        <div className={c.wrap}>
          <div className={c.container}>
            <TableHeader rowColumns={config.rowColumns} configData={config.data} />
            <TableBody
              rowColumns={config.rowColumns}
              configData={config.data}
              {...{data, config}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


export {
  Table
}
