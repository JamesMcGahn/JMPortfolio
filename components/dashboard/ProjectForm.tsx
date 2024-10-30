import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MarkdownEditor from '../editor/MarkdownEditor';
import { Project } from '../../interfaces/project';

interface FieldChange {
  name: string;
  value: string;
}

interface Props {
  validated: boolean;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditor: (editorField: FieldChange) => void;
  form: Project;
  edit: boolean;
}

function ProjectForm({
  validated,
  handleSubmit,
  handleEditor,
  handleChange,
  form,
  edit,
}: Props) {
  const handleEditorChange = (text: string, field: string) => {
    handleEditor({ name: field, value: text });
  };

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
      <Form.Group className="mb-3" controlId="mainPage">
        <Form.Label>Main Page</Form.Label>
        <Form.Check
          type="checkbox"
          id="mainPage"
          name="mainPage"
          onChange={handleChange}
          checked={form.mainPage}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="subtitle">
        <Form.Label>Subtitle</Form.Label>
        <Form.Control
          type="text"
          placeholder="Subtitle"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Enter a Subtitle
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Stack</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ex. React, Mongo"
          name="stack"
          value={form.stack.toString()}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-muted">
          Make sure list is comma separated
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Add the Project&apos;s Stack
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="hidden"
          placeholder="Description"
          name="description"
          value={form.description}
          required
        />
        <Form.Control.Feedback type="invalid">
          Add the Project&apos;s Description
        </Form.Control.Feedback>
        <div>
          <MarkdownEditor
            cb={handleEditorChange}
            fieldName="description"
            defaultValue={form.description}
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="challenges">
        <Form.Label>Challenges</Form.Label>
        <Form.Control
          type="hidden"
          placeholder="challenges"
          name="challenges"
          value={form.challenges}
          required
        />
        <Form.Control.Feedback type="invalid">
          Add the Project&apos;s Challenges
        </Form.Control.Feedback>
        <div>
          <MarkdownEditor
            cb={handleEditorChange}
            fieldName="challenges"
            defaultValue={form.challenges}
          />
        </div>
      </Form.Group>
      {edit ? null : (
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
            Add the Project&apos;s Images
          </Form.Control.Feedback>
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId="gitUrl">
        <Form.Label>Git Url</Form.Label>
        <Form.Control
          type="text"
          placeholder="Git Url"
          name="gitUrl"
          value={form.gitUrl}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Add the Project&apos;s Git URL
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="liveUrl">
        <Form.Label>Live Url</Form.Label>
        <Form.Control
          type="text"
          placeholder="Live Url"
          name="liveUrl"
          value={form.liveUrl}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Add the Project&apos;s Live URL
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ProjectForm;
