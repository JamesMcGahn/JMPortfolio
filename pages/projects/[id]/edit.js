import React from "react";
import { getSession } from "next-auth/client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import classes from "../../../styles/addproject.module.css";
import ProjectForm from "../../../components/dashboard/ProjectForm";
import Loading from "../../../components/ui/Loading";
function EditSingleProject({ project, id }) {
  const [form, setForm] = useState(project);
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

  const handleChange = (e, editorField) => {
    if (!e && editorField.name) {
      setForm({ ...form, [editorField.name]: editorField.value });
      return;
    }

    if (e.target.name === "mainPage") {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else if (e.target.name === "stack") {
      setForm({
        ...form,
        [e.target.name]: e.target.value
          .split(",")
          .map((item) => item.trim().toLowerCase()),
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const createProject = async () => {
    try {
      const res = await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER}/api/auth/projects/${project._id}`,
          form,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => router.push("/dashboard"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.addform}>
      <Card className={classes.card}>
        <Row md="12">
          {submitting ? (
            <Loading />
          ) : (
            <ProjectForm
              validated={validated}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              form={form}
              edit={true}
            />
          )}
        </Row>
      </Card>
    </div>
  );
}

export default EditSingleProject;

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
  const res = await axios.get(`${process.env.SERVER}/api/projects/${id}`);
  const { data } = await res.data;
  return { props: { project: data, id: id } };
};
