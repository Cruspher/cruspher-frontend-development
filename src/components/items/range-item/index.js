import React from 'react'
import c from './style.module.scss'
import {Range} from "react-range";
import {FlexBox} from "../../cruspher-ui/box/flexbox";
import {ActionIcon} from "../../cruspher-ui/icons/default";


const RangeItem = ({value, submit, title, max, name}) => {
  const addOne = () => {
    submit(name, [value[0] + 1])
  }

  const minusOne = () => {
    submit(name, [value[0] - 1])
  }

  return (
    <div className={c.wrap}>
      <div className={c.titleWrap}>
        <FlexBox items='center' columnGap='8px'>
          <span className={c.title}>{title}</span>
          <span className={c.value}>{value}</span>
        </FlexBox>

        <FlexBox  columnGap='8px' items='center'>
           <span>
            {value > 1 && <ActionIcon isRed={true} type='remove' submit={minusOne} />}
          </span>

          <span>
            {value < max && <ActionIcon type='add' submit={addOne} />}
          </span>
        </FlexBox>
      </div>


      <div className={c.container}>
        <Range
          step={1}
          min={1}
          max={max}
          values={value}
          onChange={(values) => submit(name, values)}
          renderTrack={({props, children}) => (
            <div
              {...props}
              className={c.track}
            >
              {children}
            </div>
          )}
          renderThumb={({props}) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className={c.range}
            />
          )}
        />
      </div>
    </div>
  )
}


export {
  RangeItem
}