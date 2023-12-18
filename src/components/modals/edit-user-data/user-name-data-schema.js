import * as Yup from "yup";

const userNameDataSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, '2')
    .max(50, 'w')
    .required('w'),
  surname: Yup.string()
    .min(2, 'w')
    .max(50, 'w')
    .required('w'),
});

export {
  userNameDataSchema
}
