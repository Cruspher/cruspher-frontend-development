import * as Yup from "yup";

export const newMessageSchema = Yup.object().shape({
  message: Yup.string()
    .min(1, 'w')
    .max(5000, 'w')
    .required('w'),
});

