import React, {useEffect, useState} from "react";
import c from './style.module.scss'
import {MdRemoveCircle} from "react-icons/all";
import {useIntl} from "react-intl";

const PlayerAvatarUpload = ({value, form, shopElements}) => {
  const intl = useIntl()
  const [preview, setPreview] = useState(null)
  const error = form?.touched['image'] && Boolean(form.errors['image']);
  const containerClass = error ? `${c.uploadContainer} ${c.uploadContainerActive}` : c.uploadContainer

  const onChoseImage = (event) => {
    form.setFieldValue('image', event.target.files[0])
  }

  const removeChoseImage = () => {
    form.setFieldValue('image', null)
  }

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === 'string') return
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);


  if (typeof value === 'string' && value) {
    return (
      <div className={c.container}>
        <div onClick={removeChoseImage} className={c.remove}><MdRemoveCircle /></div>
        <img src={`${process.env.REACT_APP_API_URL}${value}`} alt="avatar" />
        <img
          alt=''
          className={c.formImage}
          src={process.env.REACT_APP_API_URL + (form.values.position.value.toLowerCase() === 'goalkeeper' ?
            shopElements.goalkeeperForm : shopElements.playerForm)}
        />
      </div>
    )
  }



  const body = preview ? (
      <div className={c.container}>
        <div onClick={removeChoseImage} className={c.remove}><MdRemoveCircle /></div>
        {value && <img src={preview} alt="avatar" />}
        <img
          className={c.formImage}
          src={
          process.env.REACT_APP_API_URL + (form.values.position.value.toLowerCase() === 'goalkeeper'
            ? shopElements.goalkeeperForm
            : shopElements.playerForm)
        }
          alt='form3'/>
      </div>
  ) : (
    <label htmlFor='player-avatar' className={containerClass}>
      {intl.formatMessage({id: 'upload'})}
    </label>
  )

  return (
    <div className={c.container}>
      <input style={{display: 'none'}} onChange={onChoseImage} id='player-avatar' type='file'/>
      {body}
    </div>
  )
}


export {
  PlayerAvatarUpload
}
