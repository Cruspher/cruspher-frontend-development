import * as Yup from "yup";



export const trophySchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'w')
    .max(50, 'w')
    .required('w'),
  coach: Yup.string()
    .min(3, 'w')
    .max(50, 'w')
    .required('w'),
  date: Yup.date()
    .required('w'),
  image: Yup.mixed()
    .required('w')
});
