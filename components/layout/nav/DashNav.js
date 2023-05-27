import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classes from '../../../styles/DashNav.module.css'
import Link from 'next/link'
import { signOut } from "next-auth/client"
import { useSession } from "next-auth/client"
function DashNav(props) {
    const [session, loading] = useSession()
    return (
        <Container className={classes.container} fluid>
            <Navbar id={classes.nav} bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Text>
                        Signed in as: {session.user.email}  <button className={classes.signOut} onClick={() => signOut()}>Sign out</button>
                    </Navbar.Text>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ml-auto">
                            <Link href='/' passHref><Nav.Link>Home</Nav.Link></Link>
                            <Link href='/dashboard' passHref><Nav.Link>Dashboard</Nav.Link></Link>
                            <Link href='/dashboard/addproject' passHref><Nav.Link>Add Project</Nav.Link></Link>
                            <Link href='/dashboard/addart' passHref><Nav.Link>Add Art</Nav.Link></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container >
    );
}

export default DashNav;