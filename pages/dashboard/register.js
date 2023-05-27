import React, { useState } from 'react';
import { useRouter } from 'next/router'
import RegLogSignForm from '../../components/forms/RegLogSignForm'
import axios from 'axios'
import { getSession } from 'next-auth/client'
import classes from '../../styles/RegLogSignForm.module.css'
function Register(props) {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true)
        } else {
            register()
        }
    }

    const register = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/signup`,
                form,
                { headers: { "Content-Type": 'application/json' } }).then(res => router.push('/dashboard'))
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'stack' ? e.target.value.split(',') : e.target.value })
    }
    return (
        <div className={classes.formDiv} >
            <div><h3>Register a New User</h3></div>
            <RegLogSignForm handleChange={handleChange} validated={validated} handleSubmit={handleSubmit} csrfToken={false} />
        </div>
    );
}

export default Register;

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    }
    return { props: { session: session } }
}