import React, {useEffect} from 'react'
import c from './style.module.scss'
import {RangeItem} from "../../../range-item";
import {useIntl} from "react-intl";



const UserGameAdditional = ({additionalForm, setAdditionalForm}) => {
  const intl = useIntl()

  const changeFormValues = (key, value) => {
    const newForm = {...additionalForm}
    newForm[key] = value
    setAdditionalForm(newForm)
  }

  useEffect(() => {
    if (additionalForm.successShots[0] > additionalForm.shots[0]) {
      changeFormValues('successShots', additionalForm.shots)
    }

    if (additionalForm.successPasses[0] > additionalForm.passes[0]) {
      changeFormValues('successPasses', additionalForm.passes)
    }

    if (additionalForm.successDribbles[0] > additionalForm.dribbles[0]) {
      changeFormValues('successDribbles', additionalForm.dribbles)
    }
  }, [additionalForm.shots[0], additionalForm.passes[0], additionalForm.dribbles[0]])

  return (
    <div className={c.wrap}>

      <RangeItem
        name='shots'
        max={100}
        title={intl.formatMessage({id: 'shots'})}
        value={additionalForm.shots }
        submit={changeFormValues}
      />

      <RangeItem
        name='successShots'
        max={additionalForm.shots[0] > 1 ? additionalForm.shots[0] : 2}
        title={intl.formatMessage({id: 'success_shots'})}
        value={additionalForm.successShots}
        submit={changeFormValues}
      />

      <RangeItem
        value={additionalForm.passes}
        submit={changeFormValues}
        title={intl.formatMessage({id: 'passes'})}
        name='passes'
        max={1000}
      />

      <RangeItem
        value={additionalForm.successPasses}
        submit={changeFormValues}
        title={intl.formatMessage({id: 'success_passes'})}
        name='successPasses'
        max={additionalForm.passes[0] > 1 ? additionalForm.passes[0] : 2}
      />

      <RangeItem
        name='dribbles'
        max={100}
        title={intl.formatMessage({id: 'dribbles'})}
        value={additionalForm.dribbles}
        submit={changeFormValues}
      />

      <RangeItem
        name='successDribbles'
        max={additionalForm.dribbles[0] > 1 ? additionalForm.dribbles[0] : 2}
        title={intl.formatMessage({id: 'success_dribbles'})}
        value={additionalForm.successDribbles}
        submit={changeFormValues}
      />

      <RangeItem
        name='ballAccuracy'
        max={100}
        title={intl.formatMessage({id: 'ball_possession'})}
        value={additionalForm.ballAccuracy}
        submit={changeFormValues}
      />
    </div>
  )
}



export {
  UserGameAdditional
}