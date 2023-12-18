import React, {useEffect, useState} from 'react'
import {getLevelsRequest} from "../../../actions/levels";
import {Loading} from "../../cruspher-ui/loading";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import c from './style.module.scss'


const AdminLevelsList = () => {
  const intl = useIntl()
  const notify = text => toast(text)
  const [isLoading, setIsLoading] = useState(false)
  const [levels, setLevels] = useState([])

  useEffect(() => {
    getLevelsHandler()
  }, [])

  const getLevelsHandler = async () => {
    setIsLoading(true)

    const data = await getLevelsRequest()

    if (data) {
      setLevels(data.levels)
    } else {
      notify(intl.formatMessage({id: 'unknown_error'}))
    }

    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  console.log(levels.map(item => item.name).join(''))

  return (
    <div className={c.wrap}>
      {
        levels.map((item, index) => (
          <div className={c.item}>
            <span>
              {index + 1}
            </span>

            <h3 className={c.title}>{intl.formatMessage({id: item.name})}</h3>

            <span>
              -
            </span>
            <span className={c.points}>
              {item.points}
            </span>
          </div>
        ))
      }
    </div>
  )
}


export {
  AdminLevelsList
}