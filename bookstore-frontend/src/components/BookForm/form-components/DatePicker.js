import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = ({ errors, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <React.Fragment>
      <DatePicker
        className="form-control"
        placeholderText="Publication date"
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
      {errors ? <div className="invalid-feedback d-block">{errors}</div> : null}
    </React.Fragment>
  );
};

export default CustomDatePicker;
