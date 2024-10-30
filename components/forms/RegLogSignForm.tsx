import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Props {
  validated: boolean;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  csrfToken: string;
  action?: string
  method?: "POST"
}


function RegLogSignForm({
  validated,
  handleSubmit,
  handleChange,
  csrfToken,
  action,
  method,
}:Props) {
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      action={action}
      method={method}
    >
      {csrfToken ? (
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      ) : null}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Enter a Username
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Enter a Password
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegLogSignForm;
