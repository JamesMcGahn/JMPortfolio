import React from "react";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import classes from "../../styles/addproject.module.css";
import ProjectForm from "../../components/dashboard/ProjectForm";
import Loading from "../../components/ui/Loading";

function AddProject(props) {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    mainPage: false,
    stack: [],
    description: "",
    challenges: "",
    imageUrl: [],
    gitUrl: "",
    liveUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log("submit");
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
    if (editorField?.name) {
      setForm((prev) => ({
        ...prev,
        [editorField.name]: editorField.value,
      }));
      return;
    }

    if (e.target.name === "imageUrl" || e.target.name === "adtlImg") {
      setForm({ ...form, [e.target.name]: [...e.target.files] });
    } else if (e.target.name === "mainPage") {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else if (e) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const createProject = async () => {
    const sendForm = new FormData();

    sendForm.append("title", form.title);
    sendForm.append("mainPage", form.mainPage);
    sendForm.append("subtitle", form.subtitle);
    sendForm.append("stack", form.stack);
    sendForm.append("description", form.description);
    sendForm.append("challenges", form.challenges);
    form.imageUrl.forEach((file) => sendForm.append("imageUrl", file));

    sendForm.append("gitUrl", form.gitUrl);
    sendForm.append("liveUrl", form.liveUrl);
    try {
      const res = await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/api/projects`, sendForm, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((res) => {
          router.push(`/projects/${res.data.project}`);
        });
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
            />
          )}
        </Row>
      </Card>
    </div>
  );
}

export default AddProject;

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
  return { props: { session: session } };
};
