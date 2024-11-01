import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import classes from '../../styles/addproject.module.css';
import ArtForm, { FormState } from '../../components/dashboard/ArtForm';
import Loading from '../../components/ui/Loading';

function AddArt() {
  const [form, setForm] = useState<FormState>({
    title: '',
    imageUrl: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const createArt = async () => {
    setSubmitting(true);
    const sendForm = new FormData();

    sendForm.append('title', form.title);
    form.imageUrl.forEach((file) => sendForm.append('imageUrl', file));
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/api/art`, sendForm, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(() => {
          setSubmitting(false);
          router.push('/art');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      createArt();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'imageUrl' || e.target.name === 'adtlImg') {
      if (e.target.files) {
        setForm({ ...form, [e.target.name]: [...e.target.files] });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session: session } };
};
