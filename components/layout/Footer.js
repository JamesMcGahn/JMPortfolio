import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import classes from '../../styles/Footer.module.css';

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.leftDiv} />
      <div className={classes.navDiv}>
        <Nav className="justify-content-center" id={classes.nav}>
          <Link href="/" legacyBehavior passHref>
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link href="/#about" legacyBehavior passHref>
            <Nav.Link>About</Nav.Link>
          </Link>
          <Link href="/projects" legacyBehavior passHref>
            <Nav.Link>Projects</Nav.Link>
          </Link>
          <Link href="/art" legacyBehavior passHref>
            <Nav.Link>Art</Nav.Link>
          </Link>
          <Link href="/contact" legacyBehavior passHref>
            <Nav.Link>Contact</Nav.Link>
          </Link>
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
