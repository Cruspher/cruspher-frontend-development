import * as Yup from "yup";



export const newPlayerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'w')
    .max(50, 'w')
    .required('w'),
  surname: Yup.string()
    .min(3, 'w')
    .max(50, 'w')
    .required('w'),
  number: Yup.string()
    .required('w'),
  position: Yup.mixed()
    .required('w')
});
