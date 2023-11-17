// RegisterComponent.js
import React, { useState } from "react";
import { useFormInput } from "./useFormInput";
import FormField from "./FormField";

const RegisterComponent = () => {
  const username = useFormInput("");
  const password = useFormInput("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <FormField label="Username" type="text" {...username} />
        <FormField label="Password" type="password" {...password} />
        <button type="submit" disabled={submitting}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterComponent;
