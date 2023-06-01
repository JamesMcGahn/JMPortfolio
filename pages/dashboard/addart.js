import React from "react";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import classes from "../../styles/addproject.module.css";
import ArtForm from "../../components/dashboard/ArtForm";
import Loading from "../../components/ui/Loading";

function AddArt(props) {
  const [form, setForm] = useState({
    title: "",
    imageUrl: [],
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
      createArt();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "imageUrl" || e.target.name === "adtlImg") {
      setForm({ ...form, [e.target.name]: [...e.target.files] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const createArt = async () => {
    const sendForm = new FormData();

    sendForm.append("title", form.title);
    form.imageUrl.forEach((file) => sendForm.append("imageUrl", file));
    try {
      const res = await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/art`, sendForm, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((res) => {
          router.push(`/art`);
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
            <ArtForm
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

export default AddArt;

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
