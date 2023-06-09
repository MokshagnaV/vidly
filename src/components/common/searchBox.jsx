import React from "react";

const SearchBox = ({ onChange, value }) => {
  return (
    <input
      type="text"
      name="query"
      placeholder="Search..."
      className="form-control my-3"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
