import * as Yup from "yup";


const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'w')
    .max(50, 'w')
    .required('w'),
  surname: Yup.string()
    .min(3, 'w')
    .max(1000, 'w')
    .required('w'),
  login: Yup.string()
      .min(3, 'w')
      .max(1000, 'w')
      .required('w'),
  email: Yup.string()
    .email('w')
    .required('w'),
  password: Yup.string()
    .min(6)
    .max(50)
    .required(),
  confirmPassword: Yup.string()
    .min(6)
    .max(50)
    .required(),

});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('w')
    .required('w'),
  password: Yup.string()
    .min(6, 'w')
    .max(50, 'w')
    .required('w'),
});


export {
  registerSchema,
  loginSchema
}
