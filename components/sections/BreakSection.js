import React from 'react';
import Container from 'react-bootstrap/Container';
import classes from '../../styles/breakSection.module.css'
function BreakSection({ children, url, color }) {
    const backgroundImage = url ? `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 0.2) 100%), url("${url}")` : color

    return (
        <Container className={classes.break} style={{
            background: backgroundImage,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }} fluid >
            {children}
        </Container >
    );
}

export default BreakSection;