import React, { useState } from "react";

interface SmsFormProps {}

export const SmsForm: React.FC<SmsFormProps> = ({}) => {
  const [state, setState] = useState({
    message: {
      to: "",
      body: "",
    },
    submitting: false,
    error: false,
  });

  function onHandleChange(event) {
    const name = event.target.getAttribute("name");
    this.setState({
      message: { ...this.state.message, [name]: event.target.value },
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: "",
              body: "",
            },
          });
        } else {
          setState({
            message: {
              to: "",
              body: "",
            },
            submitting: false,
            error: true,
          });
        }
      });
  }

  return (
    <form
      onSubmit={onSubmit}
      className={state.error ? "error sms-form" : "sms-form"}
    >
      <div>
        <label htmlFor="to">To:</label>
        <input
          type="tel"
          name="to"
          id="to"
          value={state.message.to}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          name="body"
          id="body"
          value={state.message.body}
          onChange={onHandleChange}
        />
      </div>
      <button type="submit" disabled={state.submitting}>
        Send message
      </button>
    </form>
  );
};
