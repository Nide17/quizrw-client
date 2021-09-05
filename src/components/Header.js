import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Form, FormGroup, NavbarText, Button } from 'reactstrap'; import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import logo from '../images/quizLogo.svg'
import { connect } from 'react-redux';

const Header = ({ auth }) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    let location = useLocation();

    const authLinks = (
        <>
            <NavbarText className="mx-0 text-warning">
                <span>
                    <Link to="/webmaster">
                        <small className="text-warning">
                            {auth.user && auth.user ? `Account (${auth.user.name.split(" ")[0]})` : ''}
                        </small>
                    </Link>
                </span>
            </NavbarText>

            <NavbarText className="logout ml-2">
                <Logout />
            </NavbarText>
        </>)

    const guestLinks = (
        <>
            <NavbarText className="mx-0">
                <LoginModal />
            </NavbarText>

            <NavbarText className="mx-0">
                <RegisterModal />
            </NavbarText>
        </>
    )

    return (
        <header style={{ boxShadow: "0 2px 10px -1px rgba(0,0,0,0.75)" }}>

            <Navbar color="primary" light expand="lg" className="px-lg-5 py-md-3">
                <NavbarBrand href="/" className="text-white" style={{ fontWeight: "900" }}>
                    <img src={logo} alt="Quiz Blog Logo" />
                </NavbarBrand>

                {
                    isOpen ?
                        <Button close onClick={toggle} className="px-2 mr-1 text-danger d-none" /> :
                        <NavbarToggler onClick={toggle} />
                }

                <Collapse isOpen={isOpen} navbar>

                    <Nav className="mr-auto d-none d-lg-flex" navbar>

                        <Form className="ml-lg-5 py-2">
                            <FormGroup className="my-auto">
                                {/* <Input type="search" name="search" placeholder="Search ..." bsSize="sm" className="py-0" style={{ width: "250px" }} /> */}
                            </FormGroup>
                        </Form>
                    </Nav>

                    {
                        location.pathname !== '/' ?

                        <Button color="success" size="md" className="p-1 mr-2 px-md-2 mr-md-4">
                        <Link to="/" className="text-white">Back Home</Link>
                        </Button> :
                        
                        location.pathname !== '/all-categories' ?
                            <NavbarText className="mr-2 mr-md-4">
                                <Link to="/all-categories" className="text-white">Categories</Link>
                            </NavbarText>:
                            null
                    }

                    <NavbarText className="mr-2 mr-md-4">
                        <Link to="/about" className="text-white">About</Link>
                    </NavbarText>
                    <NavbarText className="mr-2 mr-md-4">
                        <Link to="/contact" className="text-white">Contact</Link>
                    </NavbarText>
                    {auth.isAuthenticated ? authLinks : guestLinks}
                </Collapse>

            </Navbar>
        </header>
    )
}

Header.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, null)(Header)