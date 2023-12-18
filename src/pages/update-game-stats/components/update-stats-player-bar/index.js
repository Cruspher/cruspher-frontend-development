import React from 'react'
import c from './style.module.scss'
import {FlexBox} from "../../../../components/cruspher-ui/box/flexbox";


const UpdateStatsPlayerBar = ({title, value, max}) => {
  const barWidth = value === 0 && max === 0 ? 0 : 100 / max * value


  return (
    <div className={c.wrap}>
      <div className={c.header}>
        <h5 className={c.title}>
          {title}
        </h5>

        <FlexBox items='center' columnGap='5px'>
          <span className={c.value}>
          {value}
        </span>

          <span className={c.max}>
          / {max}
        </span>
        </FlexBox>
      </div>


      <div className={c.body}>
        <div style={{width: `${barWidth}%`}} className={c.bar} />
      </div>
    </div>
  )
}


export {
  UpdateStatsPlayerBar
}
