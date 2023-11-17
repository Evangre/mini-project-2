import { useState } from 'react';

export const useSubmitForm = (initialMessage = '') => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const submitForm = async (callback) => {
    setSubmitting(true);
    setMessage('');
    try {
      const message = await callback();
      setMessage(message);
    } catch (error) {
      setMessage(error.message);
    }
    setSubmitting(false);
  };

  return {
    submitting,
    message,
    submitForm,
  };
};
