// LoginComponent.js
import React, { useState } from "react";
import { useFormInput } from "./useFormInput";
import FormField from "./FormField";

const LoginComponent = () => {
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormField label="Username" type="text" {...username} />
        <FormField label="Password" type="password" {...password} />
        <button type="submit" disabled={submitting}>
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginComponent;
