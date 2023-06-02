import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from '../../../styles/addproject.module.css';
import Loading from '../../../components/ui/Loading';

function EditSingleProjectImages({ project, id }) {
  const [form, setForm] = useState({
    imageUrl: [],
    deleteImage: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const sendImageUpdate = async () => {
    const sendForm = new FormData();
    form.imageUrl.forEach((file) => sendForm.append('imageUrl', file));
    form.deleteImage.forEach((name) => sendForm.append('delete[]', name));
    try {
      setSubmitting(true);
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER}/api/projects/${id}/images`,
          sendForm,
          { headers: { 'content-type': 'multipart/form-data' } },
        )
        .then((res) => {
          setSubmitting(false);
          setForm({
            imageUrl: [],
            deleteImage: [],
          });
          router.replace(router.asPath);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setSubmitting(true);
      sendImageUpdate();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      setForm({ ...form, [e.target.name]: [...e.target.files] });
    }
    if (e.target.name === 'delete[]') {
      if (e.target.checked) {
        setForm({
          ...form,
          deleteImage: [...form.deleteImage, e.target.value],
        });
      }
      if (!e.target.checked) {
        const remainingCheck = form.deleteImage.filter(
          (item) => item !== e.target.value,
        );
        setForm({ ...form, deleteImage: remainingCheck });
      }
    }
  };

  if (submitting) {
    return (
      <div className={classes.addform}>
        <Card className={classes.card}>
          <Loading />
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.addform}>
      <Card className={classes.card}>
        <Container className="mb-4">
          <h1>{`Add or Delete - ${project.title}'s Images`}</h1>
          <h5>Upload or Select a picture to get started.</h5>
        </Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="imageUrl">
            <Form.Control
              type="file"
              placeholder="Image Url"
              name="imageUrl"
              multiple
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Add the Project&apos;s Image
            </Form.Control.Feedback>
          </Form.Group>

          {project.imageUrl.length > 0 && (
            <Row>
              {project.imageUrl.map((img, i) => (
                <Col xs={6} md={4} key={img.filename}>
                  <Image src={img.url} thumbnail alt="project image" />
                  <Form.Check
                    type="checkbox"
                    label="Delete"
                    id={`${i}-img`}
                    name="delete[]"
                    value={`${img.filename}`}
                    onChange={handleChange}
                  />
                </Col>
              ))}
            </Row>
          )}
          <Container className="mt-4 d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Container>
        </Form>
      </Card>
    </div>
  );
}

export default EditSingleProjectImages;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { id } = context.query;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER}/api/projects/${id}`,
  );
  const { data } = await res.data;
  return { props: { project: data, id: id } };
};
