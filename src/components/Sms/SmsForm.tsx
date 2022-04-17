import React, { useState } from "react";

interface SmsFormProps {}

export const SmsForm: React.FC<SmsFormProps> = ({}) => {
  const [message, setMessage] = useState({
    to: "",
    body: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  function onHandleChange(event) {
    const name = event.target.getAttribute("name");
    setMessage({ ...message, [name]: event.target.value });
  }

  function onSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    fetch("http://localhost:4001/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data");
        console.log(data);
        if (data.success) {
          setError(false);
          setSubmitting(false);
          setMessage({
            to: "",
            body: "",
          });
        } else {
          setSubmitting(false);
          setError(true);
        }
      });
  }

  return (
    <form onSubmit={onSubmit} className={error ? "error sms-form" : "sms-form"}>
      <div>
        <label htmlFor="to">To:</label>
        <input
          type="tel"
          name="to"
          id="to"
          value={message.to}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          name="body"
          id="body"
          value={message.body}
          onChange={onHandleChange}
        />
      </div>
      <button type="submit" disabled={submitting}>
        Send message
      </button>
    </form>
  );
};
