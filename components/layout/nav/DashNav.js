import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import classes from '../../../styles/DashNav.module.css';

function DashNav() {
  const { data: session } = useSession();
  return (
    <Container className={classes.container} fluid>
      <Navbar id={classes.nav} bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Text>
            Signed in as: {session.user.email}
            <button
              type="button"
              className={classes.signOut}
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <Link href="/" legacyBehavior passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/dashboard" legacyBehavior passHref>
                <Nav.Link>Dashboard</Nav.Link>
              </Link>
              <Link href="/dashboard/addproject" legacyBehavior passHref>
                <Nav.Link>Add Project</Nav.Link>
              </Link>
              <Link href="/dashboard/addart" legacyBehavior passHref>
                <Nav.Link>Add Art</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default DashNav;
