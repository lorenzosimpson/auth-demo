import React, { useState } from 'react';
import { useContext } from 'react';
import { Container, Card, CardBody, Row } from 'reactstrap';
import { SessionContext } from '../contexts/SessionContext';
import TabbedNav from './TabbedNav';
// import ProfilePlaceholder from './ProfilePlaceholder';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import Loader from './Loader';
import useAuthentication from '../utils/useAuthentication';

const Profile = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const { user } = useContext(SessionContext);
    const [user] = useAuthentication();
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const { loggedIn } = props;


    const properties = [
        {
            key: "First Name",
            val: user.first_name
        },
        {
            key: "Last Name",
            val: user.last_name
        },
        {
            key: "Username",
            val: user.username
        },
        {
            key: "Password",
            val: ""
        },
    ]
    console.log(user, 'profile')
    if (user.loggedIn === undefined) return <Loader />
    if (loggedIn === false) return <Redirect to="/login" />
    
    return (
        <Container>
            <h2 className="mb-3">
                Welcome back, {user.first_name}
                        </h2>
            <Card>
                <CardBody>
                    <TabbedNav toggle={toggle} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
                    <Card className="mt-2">
                        <CardBody>
                            {
                                props.location.pathname.includes('/settings') ? (
                                    <p>Settings</p>
                                ) : 
                                    properties.map((p, index) => (
                                        <>
                                            {index !== 0 && (<hr></hr>)}
                                            <Row>
                                                <div className="col col-md-3">
                                                    {p.key}
                                                </div>
                                                <div className="col">
                                                    {
                                                    p.key === "Password" ? 
                                                    ( <Button>Change</Button>) 
                                                    : 
                                                    (<span className="font-weight-bold">{p.val}</span>)
                                                    }
                                                </div>
                                            </Row>
                                        </>
                                    )
                                )
                            }
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Profile;

