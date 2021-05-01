import React, { useState } from 'react';
import { useContext } from 'react';
import { Container, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { SessionContext } from '../contexts/SessionContext';
import TabbedNav from './TabbedNav';
import ProfilePlaceholder from './ProfilePlaceholder';
import { Button } from 'semantic-ui-react';

const Profile = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useContext(SessionContext);
    const toggle = () => setDropdownOpen(!dropdownOpen);


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

    return (
        <Container>
            <Card>
                <CardBody>
                    <CardTitle>
                        <h2>
                            Welcome back, {user.first_name}
                        </h2>
                    </CardTitle>
                    <TabbedNav toggle={toggle} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
                    <Card className="mt-2">
                        <CardBody>

                            {
                                !Object.values(user).length ? (
                                    <ProfilePlaceholder />
                                ) :
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

