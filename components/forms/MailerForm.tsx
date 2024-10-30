import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Props {
  validated: boolean;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}



function MailerForm({ validated, handleSubmit, handleChange, children }:Props) {
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="user_name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your Name"
          name="user_name"
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Enter Your Name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="user_email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your Email"
          name="user_email"
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Enter a Email
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          placeholder="Subject"
          name="subject"
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Enter a Subject
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Your Message"
          name="message"
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid" id="error">
          Enter a Message
        </Form.Control.Feedback>
      </Form.Group>
      {children}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default MailerForm;
