import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export interface FormState {
  title: string;

  imageUrl: File[];
}

interface Props {
  validated: boolean;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  form: FormState;
}

function ArtForm({ validated, handleSubmit, handleChange, form }: Props) {
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Enter a Title
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          placeholder="Image Url"
          name="imageUrl"
          multiple
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Add the Image
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ArtForm;
