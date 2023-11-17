import React from 'react';
import { useFormInput } from '../hooks/useFormInput';
import { useSubmitForm } from '../hooks/useSubmitForm';
import FormField from './FormField';

const LoginComponent = () => {
  const username = useFormInput('');
  const password = useFormInput('');
  const { submitting, message, handleSubmit } = useSubmitForm();

  const onLogin = async () => {
    // TODO: Implement the login logic, likely involving an API call
    // This function should return an object with a 'message' field on success or throw an Error on failure
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onLogin); }}>
        <FormField label="Username" type="text" {...username} />
        <FormField label="Password" type="password" {...password} />
        <button type="submit" disabled={submitting}>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginComponent;
