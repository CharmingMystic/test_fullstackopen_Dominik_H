import React from "react";

function Contact({ name, phone }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{phone}</td>
    </tr>
  );
}

export default Contact;
