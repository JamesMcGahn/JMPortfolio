import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { getCsrfToken } from "next-auth/client"
import classes from '../../styles/RegLogSignForm.module.css'

import RegLogSignForm from '../../components/forms/RegLogSignForm'
function Login(props) {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState();
    const router = useRouter()
    const { csrfToken } = props

    const handleSubmit = async (e) => {
        if (e.currentTarget.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true)
        } else {
            // setSubmitting(true)

        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'stack' ? e.target.value.split(',') : e.target.value })
    }
    return (
        <div className={classes.formDiv} >
            <div><h3>Login</h3></div>
            <RegLogSignForm action={`${process.env.NEXT_PUBLIC_SERVER}/api/auth/callback/credentials`} method={'POST'} handleChange={handleChange} validated={validated} handleSubmit={handleSubmit} csrfToken={csrfToken} />
        </div >
    );
}

export default Login;

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    }
}