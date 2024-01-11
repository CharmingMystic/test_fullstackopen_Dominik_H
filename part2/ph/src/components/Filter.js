import React from "react";

function Filter({ handleChange, newFilter }) {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input name="filter" onChange={handleChange} value={newFilter} />
      </div>
    </>
  );
}

export default Filter;
