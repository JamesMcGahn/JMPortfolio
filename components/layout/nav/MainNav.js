import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "../../../styles/Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
function MainNav(props) {
  const router = useRouter();
  return (
    <Container className={classes.container} fluid>
      <Navbar id={classes.nav} bg="dark" expand="lg" variant="dark">
        <Container
          id={classes.innerCont}
          style={
            router.pathname === "/projects" || router.pathname === "/art"
              ? { background: "rgba(0, 0, 0, 0.5)" }
              : {}
          }
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MainNav;
