import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import RegLogSignForm from '../../components/forms/RegLogSignForm';
import classes from '../../styles/RegLogSignForm.module.css';

function Register() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();

  const register = async () => {
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/signup`, form, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(() => router.push('/dashboard'));
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
      register();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={classes.formDiv}>
      <div>
        <h3>Register a New User</h3>
      </div>
      <RegLogSignForm
        handleChange={handleChange}
        validated={validated}
        handleSubmit={handleSubmit}
        csrfToken=""
      />
    </div>
  );
}

export default Register;

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
