import React from 'react'
import c from './style.module.scss'
import {useIntl} from "react-intl";

const getItemPoints = (rateValue, gameValue, zone1, zone2, zone3) => {
  if (rateValue === gameValue) {
    return 1
  } else if (rateValue > gameValue - zone1 && rateValue < gameValue + zone1) {
    return 1
  } else if (rateValue >= gameValue - zone2 && rateValue <= gameValue + zone2) {
    return 0.5
  } else if (rateValue >= gameValue - zone3 && rateValue <= gameValue + zone3) {
    return 0.3
  }

  return 0
}


const FinalRateStatsItem = ({title, maxSize, rateValue, gameValue, zone3, zone2, zone1}) => {
  const points = getItemPoints(rateValue, gameValue, zone1, zone2, zone3)
  const zoneValues = []
  const startValue = gameValue - zone3
  const endValue = gameValue + zone3
  const intl = useIntl()

  for (let i = startValue; i <= endValue; i++) {
    if (i === gameValue) {
      zoneValues.push({
        color: 'rgba(0, 190, 20, 1)',
        key: i
      })
    } else if (i > gameValue - zone1 && i < gameValue + zone1) {
      zoneValues.push({
        color: 'rgba(0, 190, 20, 1)',
        key: i
      })
    } else if (i >= gameValue - zone2 && i <= gameValue + zone2) {
      zoneValues.push({
        color: 'rgba(0, 190, 20, 0.7)',
        key: i
      })
    } else if (i >= gameValue - zone3 && i <= gameValue + zone3) {
      zoneValues.push({
        color: 'rgba(0, 190, 20, 0.5)',
        key: i
      })
    }
  }

  const gameValuesToShow = zoneValues.filter(item => !!item && item?.key > 0)


  console.log(gameValuesToShow, 'gameValuesToShow', title)

  return (
    <div className={c.wrap}>
      <h5 className={c.title}>{intl.formatMessage({id: title})}</h5>
      <div className={c.section}>
        <div className={c.count}>
          0
        </div>

        <div className={c.line} style={{gridTemplateColumns: `repeat(${maxSize + zone3 + 5}, 1fr)`}}>
          {
            gameValuesToShow.map(item => (
              <div key={Math.random().toString()} style={{gridColumn: item.key, background: item.color}} className={c.gameValues}/>
            ))
          }
          <div style={{gridColumn: rateValue, gridRow: 1}} className={c.rateValue}>
            <div className={c.rateValueText}>
              +{points}
            </div>
            <span className={c.rateValuePoints}>
              {rateValue}
            </span>
          </div>
        </div>

        <div className={c.count}>
          {maxSize + zone3 + 5}
        </div>
      </div>
    </div>
  )
}


export {
  FinalRateStatsItem
}