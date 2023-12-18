import * as Yup from "yup";



export const newThemeSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'w')
    .max(300, 'w')
    .required('w'),
});
