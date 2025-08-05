import "./ContactForm.css";
import React, { useState } from "react";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    await fetch("https://formspree.io/f/xwpqqzbq", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    setSubmitted(true);
    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: 800,
      }}
    >
      <input
        type="text"
        className="contact-form-input"
        name="name"
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        className="contact-form-input"
        name="email"
        placeholder="Your Email"
        required
      />
      <textarea
        className="contact-form-input"
        name="message"
        placeholder="Your Message"
        required
      />
      <button type="submit" className="contact-form submit">
        Send
      </button>
      {submitted && <p>Thank you for your message!</p>}
    </form>
  );
}

export default ContactForm;
