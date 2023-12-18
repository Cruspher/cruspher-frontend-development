import * as Yup from "yup";

export const shopElementSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'w')
    .max(50, 'w')
    .required('w'),
  imagePreview: Yup.mixed(),
  image: Yup.string().when('imagePreview', {
    is: false,
    then: Yup.mixed().required('w')
  })
});
