import React, { useState, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import { useFormikContext } from "formik";

import { Context } from "../../../context/alertContext";

const CustomSelect = ({ errors, options, items, setItems, createItem, ...props }) => {
  const { addAlert } = useContext(Context);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);

  function handleOptionChange(selection) {
    setFieldValue(props.name, selection);
  }

  function updateBlur() {
    setFieldTouched(props.name, true);
  }

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    const newItem = await createItem(inputValue, addAlert);
    setItems(items.concat(newItem));
    setIsLoading(false);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#ddd" : !errors ? "#ddd" : "#dc3545",
      "&:hover": {
        borderColor: state.isFocused ? "#ddd" : !errors ? "#ddd" : "#dc3545",
      },
    }),
  };

  return (
    <React.Fragment>
      <CreatableSelect
        options={options}
        {...props}
        isDisabled={isLoading}
        isLoading={isLoading}
        onCreateOption={handleCreate}
        onBlur={updateBlur}
        onChange={handleOptionChange}
        styles={customStyles}
      />
      {errors ? (
        <div className="invalid-feedback d-block">
          {errors.value ? errors.value : errors}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default CustomSelect;
