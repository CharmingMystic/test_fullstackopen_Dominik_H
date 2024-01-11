import React from "react";

function Form({ newName, newPhone, handleChange, handleSubmit }) {
  return (
    <>
      <h2>Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" value={newName} onChange={handleChange} />
        </div>
        <div>
          number:{" "}
          <input name="phone" value={newPhone} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default Form;
