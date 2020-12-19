import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup.string().required("Permission type is required").nullable(),
  lastName: yup.string().required("Permission type is required").nullable(),
  email: yup.string().required("Permission type is required").nullable(),
  postalCode: yup.string().required("Permission type is required").nullable(),
  street: yup.string().required("Permission type is required").nullable(),
  buildingNo: yup.string().required("Permission type is required").nullable(),
  flatNo: yup.string().required("Permission type is required").nullable(),
  city: yup.string().required("Permission type is required").nullable(),
  phoneNumber: yup.string().required("Permission type is required").nullable(),
});
