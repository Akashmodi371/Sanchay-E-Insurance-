import React from "react";

const CustomDatePickerInput = ({ value, onClick }) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    readOnly // Disable manual entry
  />
);

export default CustomDatePickerInput;
