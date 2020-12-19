import * as yup from "yup";

export const initialValues = {
  isbn: "",
  title: "",
  description: "",
  author: undefined,
  publisher: undefined,
  genres: [],
  language: "",
  format: "",
  pages: "",
  publicationDate: "",
  availableQuantity: "",
  price: "",
  cover: "",
};

export const bookSchema = yup.object({
  isbn: yup.string().length(13).required("Permission type is required"),
  title: yup.string().required("Permission type is required"),
  genres: yup
    .array(
      yup.object().shape({
        label: yup.string(),
        value: yup.string().required("Permission type is required"),
      })
    )
    .required("Permission type is required"),
  publicationDate: yup.date().required("Permission type is required"),
  description: yup.string(),
  authors: yup.array(
    yup.object().shape({
      label: yup.string(),
      value: yup.string().required("Permission type is required"),
    })
  ).required("Permission type is required"),
  publishers: yup.array(
    yup.object().shape({
      label: yup.string(),
      value: yup.string().required("Permission type is required"),
    })
  ).required("Permission type is required"),
  language: yup.string().required("Permission type is required"),
  format: yup.string().required("Permission type is required"),
  pages: yup.string().required("Permission type is required"),
  availableQuantity: yup.number().required("Permission type is required"),
  price: yup.number().required("Permission type is required"),
  cover: yup.mixed(),
});
