import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'
import classes from '../../styles/RegLogSignForm.module.css'
import MailerForm from '../../components/forms/MailerForm'
import ReactLoading from 'react-loading';
import PageHead from '../../components/layout/PageHead'

function ContactPage() {
    const [validated, setValidated] = useState(false);
    const [captcha, setCaptcha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [form, setForm] = useState({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
    });

    async function onChange(value) {

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/captcha`, {
                headers: { "Content-Type": 'application/json' },
                data: {
                    response: value
                }
            }).then(res => { setCaptcha(res.data.captcha) })

        } catch (error) {
            console.log(error)
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false || captcha === false) {

            e.stopPropagation();
            setValidated(true)
        } else {
            try {
                setLoading(true)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/mailer`, {
                    headers: { "Content-Type": 'application/json' },
                    data: form
                }).then(res => {
                    setLoading(false)
                    if (res.data.mailer === 200) {
                        setSuccess(true)
                        setForm({
                            user_name: '',
                            user_email: '',
                            subject: '',
                            message: ''
                        })
                        setCaptcha(false)
                        window.scrollTo(0, 0)
                    } else if (res.data.mailer === 400) {
                        setLoading(false)
                        setError(true)
                    }
                })

            } catch (error) {
                setError(true)
                setLoading(false)
                console.log(error)
            }

        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div className={classes.formDiv} >
            <PageHead title='James McGahn | Contact' />
            <h1>Contact</h1>
            {success ? <span className={classes.success}>Successfully Submitted</span> : null}
            {error ? <span className={classes.success}>Opps...Looks Like There Was An Error</span> : null}
            {loading ?
                <ReactLoading type='bars' color='#ffffff' height={100} width={100} />
                :
                <MailerForm handleChange={handleChange} handleSubmit={handleSubmit} validated={validated}>
                    <div className={classes.captcha} >

                        <ReCAPTCHA
                            sitekey="6Lc55RkUAAAAAOPJdIsuhK5bnstiQD8H3t9rV_ml"
                            onChange={onChange}
                            size='compact'
                            theme='dark'
                        />
                        {!captcha ? <div className={classes.captchaMessage}>Fill out captcha</div> : null}
                    </div>
                </MailerForm>
            }
        </div>
    );
}

export default ContactPage;