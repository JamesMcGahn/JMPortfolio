import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getCsrfToken } from 'next-auth/react';
import classes from '../../styles/RegLogSignForm.module.css';
import RegLogSignForm from '../../components/forms/RegLogSignForm';

interface Props {
  csrfToken: string;
}

function Login({ csrfToken }: Props) {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
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
        <h3>Login</h3>
      </div>
      <RegLogSignForm
        action={`${process.env.NEXT_PUBLIC_SERVER}/api/auth/callback/credentials`}
        method="POST"
        handleChange={handleChange}
        validated={validated}
        handleSubmit={handleSubmit}
        csrfToken={csrfToken}
      />
    </div>
  );
}

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
