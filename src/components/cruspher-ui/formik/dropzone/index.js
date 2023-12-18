import React, {useCallback, useState, useEffect} from "react";
import {AiFillDelete} from "react-icons/all";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {useIntl} from "react-intl";
import {DropzoneEmpty} from "./components/dropzome-empty";
import {FlexBox} from "../../box/flexbox";
import {Loading} from "../../loading";
import c from './style.module.scss'


export const Dropzone = ({form,  name, imagePreview, value, height}) => {
  const intl = useIntl()
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isHaveError =
    form && form.touched[name] && Boolean(form.errors[name]);
  const containerClass = isHaveError ? `${c.container} ${c.containerActive}` : c.container

  const isBackendPreviewActive = form.values[imagePreview] && !form.values[name]


  useEffect(() => {
    if (form.values[imagePreview] || isBackendPreviewActive) return
    if (!value) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);
    form.setFieldValue(imagePreview, null)

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);


  const notify = (text) => toast(text);


  const onDrop = useCallback(
    async (acceptedFiles) => {

      if (acceptedFiles.length && !isLoading) {
        setIsLoading(true);
        form.setFieldValue(name, acceptedFiles[0])
        setIsLoading(false);
      } else {
        notify(intl.formatMessage({id: 'unknown_error'}))
      }
    },
    [form.values[name]]
  );

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const setFileNull = () => {
    form.setFieldValue(imagePreview, null);
    form.setFieldValue(name, null);
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }


  return (
    <div
      {...getRootProps()}
      className={containerClass}
      style={{height: height && height}}
    >
      {
         form.values[name] !== null ? (
          <>
            <span className={c.removeIconWrap} onClick={setFileNull}>
              <AiFillDelete className={c.removeIcon} />
            </span>
            <img src={preview ? preview : form.values[imagePreview]} className={c.image} alt="preview"/>
          </>
        ) : (
          <>
            <input {...getInputProps()} />
            <FlexBox>
              <DropzoneEmpty/>
            </FlexBox>
          </>
        )
      }
    </div>
  );
};
