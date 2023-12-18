import * as Yup from "yup";

const userChangePasswordSchema = Yup.object().shape({
  actualPassword: Yup.string()
    .min(2, '2')
    .max(50, 'w')
    .required('w'),

  newPassword: Yup.string()
    .when('actualPassword', (actualPassword, field) =>
      actualPassword ? field.required() : field
    )
    .min(2, 'w')
    .max(50, 'w')
    .required('w'),

  newPasswordAgain: Yup.string()
    .when('newPassword', (newPassword, field) =>
      newPassword ? field.required().oneOf([Yup.ref('newPassword')]) : field
    )
    .min(2, 'w')
    .max(50, 'w')
    .required('w'),
});

export {
  userChangePasswordSchema
}
