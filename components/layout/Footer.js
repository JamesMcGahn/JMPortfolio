import React from 'react';
import classes from '../../styles/Footer.module.css';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link'

function Footer(props) {
    return (
        <div className={classes.footer}>
            <div className={classes.leftDiv}></div>
            <div className={classes.navDiv}>
                <Nav className="justify-content-center" id={classes.nav}>
                    <Link href='/' passHref><Nav.Link>Home</Nav.Link></Link>
                    <Link href='/#about' passHref><Nav.Link>About</Nav.Link></Link>
                    <Link href='/projects' passHref><Nav.Link>Projects</Nav.Link></Link>
                    <Link href='/art' passHref><Nav.Link>Art</Nav.Link></Link>
                    <Link href='/contact' passHref><Nav.Link>Contact</Nav.Link></Link>
                </Nav>
            </div>
            <div className={classes.rightDiv}>
                <div>
                    <p>©2021 James McGahn</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;