import * as Yup from "yup";



export const newsSchema = Yup.object().shape({
  image: Yup.mixed()
    .required('w'),

});
