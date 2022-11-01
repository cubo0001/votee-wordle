import React from "react";
import { Container, Navbar } from "react-bootstrap";
const NavbarApp = () => {
    return (
        <Navbar className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <Container fluid>
                <Navbar.Brand className="navbar-brand" href="/play">
                    Wordle
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavbarApp;
