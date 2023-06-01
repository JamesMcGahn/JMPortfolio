import React from "react";
import { getSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import classes from "../../../styles/addproject.module.css";
import ProjectForm from "../../../components/dashboard/ProjectForm";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditSingleProjectImages({ project, id }) {
  const [form, setForm] = useState({
    imageUrl: [],
    deleteImage: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setSubmitting(true);
      createProject();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "imageUrl") {
      setForm({ ...form, [e.target.name]: [...e.target.files] });
    }
    if (e.target.name === "delete[]") {
      if (e.target.checked) {
        setForm({
          ...form,
          deleteImage: [...form.deleteImage, e.target.value],
        });
      }
      if (!e.target.checked) {
        const remainingCheck = form.deleteImage.filter(
          (item) => item !== e.target.value
        );
        setForm({ ...form, deleteImage: remainingCheck });
      }
    }
  };
  const createProject = async () => {
    const sendForm = new FormData();
    form.imageUrl.forEach((file) => sendForm.append("imageUrl", file));
    form.deleteImage.forEach((name) => sendForm.append("delete[]", name));
    try {
      const res = await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER}/api/auth/projects/${id}/images`,
          sendForm,
          { headers: { "content-type": "multipart/form-data" } }
        )
        .then((res) => {
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
  return (
    <div className={classes.addform}>
      <Card className={classes.card}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="imageUrl">
            <Form.Label>Image Url</Form.Label>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>

          {project.imageUrl.length > 0 && (
            <Row>
              {project.imageUrl.map((img, i) => (
                <Col xs={6} md={4} key={i}>
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
        destination: "/",
        permanent: false,
      },
    };
  }
  const { id } = context.query;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER}/api/projects/${id}`
  );
  const { data } = await res.data;
  return { props: { project: data, id: id } };
};
