import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    Row,
    Col
} from 'reactstrap';
import { Button } from 'semantic-ui-react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import history from '../history';
import logo from '../assets/images/logo.png';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { setReturnTo } = props;
    const { user, setUser } = useContext(UserContext);
    const userPhoto = `https://ui-avatars.com/api/?name=${user.username}&background=F37291&color=fff`;
    const [scroll, setScroll] = useState(0);
    const loggedIn = user.loggedIn;
    const [searchText, setSearchText] = useState('')
    
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function handleScroll() {
        setScroll(window.pageYOffset);
    }

    function logout() {
        axios.post('/user/logout')
            .then(response => {
                if (response.status === 200) {
                    setUser({
                        loggedIn: false,
                        user: null
                    })
                    setReturnTo('/')
                    history.push('/')
                };
            })
            .catch(error => console.log('Error logging out, ', error))
    }

    function handleSearch(e) {
        e.preventDefault();
        history.push({
            pathname: '/search',
            state: {
                searchText: searchText
            }
        })
        setSearchText("")
    }

    function handleChange(event) {
        setSearchText(event.target.value)
    }

    return (
        <div className={scroll > 0 ? "nav-container shadow" : "nav-container"}>
            <Navbar color="light" light expand="md">
                <NavbarBrand onClick={() => history.push('/')} >
                        <img src={logo}
                            alt="Hackathon Portal logo"
                            className="logo"></img>
                </NavbarBrand>
               
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="mr-3">
                            <NavLink tag={RouterNavLink}
                                exact
                                activeClassName="router-link-exact-active"
                                className="nav-link" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem className="mr-3">
                            <NavLink tag={RouterNavLink}
                            to="/explore"
                            activeClassName="router-link-exact-active"
                            exact
                            className="nav-link">Explore</NavLink>
                        </NavItem>
                        {loggedIn && (
                            <>
                        <NavItem className="mr-3"> 
                            <NavLink 
                            to="/create" 
                            tag={RouterNavLink}
                            activeClassName="router-link-exact-active"
                            exact
                            >Create</NavLink>
                        </NavItem>
                        <NavItem>
                                    <NavLink 
                                    to="/my-hackathons" 
                                    tag={RouterNavLink}
                                    activeClassName="router-link-exact-active"
                                    exact
                                    >My Hackathons</NavLink>
                                </NavItem>
                        </>
                        )}
                    </Nav>
                    <Nav className="ml-auto mr-4 d-none d-md-block">
                    <NavItem>
                    <form onSubmit={handleSearch} onChange={handleChange}>
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="navbar-prompt" name="searchText" value={searchText} placeholder="Search Hackathons"></input>
                                <i className="search icon"></i>
                            <Button className="ml-2" color="teal" icon="search" content="Search"></Button>
                            </div>
                        </div>
                    </form>
                    </NavItem>
                </Nav>
                    <Nav className="d-none d-md-flex align-items-center" navbar>
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
                                            <i className="fas fa-user mr-2" /> Profile
                    </DropdownItem>
                                        {loggedIn && (
                                            <>

                                                <DropdownItem
                                                    onClick={() => logout()}
                                                >
                                                    <i className="fas fa-power-off mr-2" /> Log
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
                                <Button primary
                                    onClick={() => history.push('/login')}
                                >Get Started</Button>
                            </NavItem>
                        )}
                    </Nav>
                 
                  
                    <form className="d-md-none" onSubmit={handleSearch} onChange={handleChange}>
                        <div className="ui search">
                            <div className="ui icon input w-100">
                                <input className="navbar-prompt mr-1" name="searchText" value={searchText} placeholder="Search"></input>
                                <i className="search icon"></i>
                        <Button className="" color="teal"  content="Search"></Button>
                            </div>
                        </div>
                    </form>
                   
                  
                    {!loggedIn && (
              <Nav className="d-md-none" navbar>
              
                <NavItem>
                  <Button
                    className="w-100"
                    primary
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
                            <i  className="fas fa-user mr-3" />
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
                                <i className="fas fa-power-off mr-3" />
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
