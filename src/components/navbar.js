import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink,
    Button
} from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import history from '../history';
import { SessionContext } from '../contexts/SessionContext';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { updateUser, loggedIn, setReturnTo } = props;
    const { user } = useContext(SessionContext);
    const userPhoto = `https://ui-avatars.com/api/?name=${user.username}&background=F37291&color=fff`
    const toggle = () => setIsOpen(!isOpen);
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    function handleScroll() {
        setScroll(window.pageYOffset);
    }

    function logout() {
        axios.post('/user/logout')
            .then(response => {
                if (response.status === 200) {
                    updateUser({
                        loggedIn: false,
                        user: null
                    })
                    setReturnTo('/')
                    history.push('/')
                };
            })
            .catch(error => console.log('Error logging out, ', error))
    }

    return (
        <div className={scroll > 0 ? "nav-container shadow" : "nav-container"}>
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    <RouterNavLink
                        to="/"
                    >
                        <img src={logo}
                            alt="Hackathon Portal logo"
                            className="logo"></img>

                    </RouterNavLink>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={RouterNavLink}
                                exact
                                activeClassName="router-link-exact-active"
                                className="nav-link" to="/">Home</NavLink>
                        </NavItem>

                    </Nav>
                    <Nav className="d-none d-md-block" navbar>
                        {loggedIn && (
                            <>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <img
                                            src={userPhoto}
                                            alt="Profile"
                                            className="nav-user-profile rounded-circle"
                                            width="30"
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem
                                            tag={RouterNavLink}
                                            to="/profile"
                                            className="dropdown-profile"
                                            activeClassName="router-link-exact-active"
                                        >
                                            <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                                        {loggedIn && (
                                            <>

                                                <DropdownItem
                                                    id="qsLogoutBtn"
                                                    onClick={() => logout()}
                                                >
                                                    <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                                            </>
                                        )}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                        )}
                        {!loggedIn && (
                            <NavItem >
                                <Button color="primary"
                                    onClick={() => history.push('/login')}
                                >Get Started</Button>
                            </NavItem>
                        )}
                    </Nav>
                    {!loggedIn && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => {
                        toggle()
                        history.push('/login')
                    }}
                  >
                    Get Started
                  </Button>
                </NavItem>
              </Nav>
            )}
            {loggedIn &&
                   ( <Nav
                        className="d-md-none justify-content-between"
                        navbar
                        style={{ minHeight: 170 }}
                        onClick={toggle}
                    >
                        <NavItem>
                            <span className="user-info">
                                <img
                                    src={userPhoto}
                                    alt="Profile"
                                    className="nav-user-profile d-inline-block rounded-circle mr-3"
                                    width="50"
                                />
                                <h6 className="d-inline-block">{user.username}</h6>
                            </span>
                        </NavItem>
                        <NavItem>
                            <FontAwesomeIcon icon="user" className="mr-3" />
                            <RouterNavLink
                                to="/profile"
                                activeClassName="router-link-exact-active"
                            >
                                Profile
                                </RouterNavLink>
                        </NavItem>

                        <NavItem>
                            <RouterNavLink
                                to="#"
                                id="qsLogoutBtn"
                                onClick={() => logout()}
                            >
                                <FontAwesomeIcon icon="power-off" className="mr-3" />
                    Log out
                  </RouterNavLink>
                        </NavItem>
                    </Nav>
                   )
}
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;
