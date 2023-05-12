import React from "react";

const Select = ({ name, value, label, errors, options, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        className="form-control"
        name={name}
        id={name}
        onChange={onChange}
      >
        <option value=""></option>
        {options.map((op) => (
          <option key={op._id} value={op._id}>
            {op.name}
          </option>
        ))}
        {errors && <div className="alert alert-danger">{errors}</div>}
      </select>
    </div>
  );
};

export default Select;
