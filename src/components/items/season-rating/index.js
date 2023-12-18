import React, {useEffect, useState} from "react"

import c from './style.module.scss'


const SeasonRating = ({seasonRating}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const cardClass = !isLoaded ? c.card : `${c.card} ${c.cardActive}`
  const ratingToShow = seasonRating?.rating ? seasonRating.rating.toFixed(1).toString().split('').filter(item => item !== '.') : []


  useEffect(() => {
    setTimeout(() => setIsLoaded(true))
  }, [])

  return (
    <section className={c.wrap}>

      <div className={c.scene}>
        {
          ratingToShow.map(item => (
            <div  className={cardClass} key={Math.random().toString()}>
              <div className={`${c.cardFace} ${c.cardFaceFront}`}/>
              <div className={`${c.cardFace} ${c.cardFaceBack}`}>{item}</div>
            </div>
          ))
        }
      </div>
    </section>
  )
}


export {
  SeasonRating
}
