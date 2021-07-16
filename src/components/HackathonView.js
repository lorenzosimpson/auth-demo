import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { Container, Header, Card, Label, Statistic, Segment, Button} from 'semantic-ui-react';
import InnerLoader from './load/InnerLoader';
import Modal from './ConfirmModal';
import Alert from './alert/Alert';
import IconButton from './button/IconButton';
import { Link } from 'react-router-dom';
import ProjectView from './projects/ProjectView';
import { UserContext } from '../contexts/UserContext';
import history from '../history';
import moment from 'moment';
import DateTime from './DateTime';





function HackathonView(props) {
    const [hackathon, setHackathon] = useState({});
    const { id } = props.match.params;
    const { user, setUser } = useContext(UserContext)
    const [associated, setAssociated] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const isHackathonOrganizer = user.id === hackathon.organizer_id;
    const imgUrl = hackathon.image;
    const [alreadyParticipatingInAProject, setAlreadyParticipatingInAProject] = useState(false);
    const [isOrganizer, setIsOrganizer] = useState(false)
    const [isParticipant, setIsParticipant] = useState(false)

    const formatDate = date => {
        return moment(date).format('llll')
    };

    useEffect(() => window.scrollTo(0, 0), [successMessage, errorMessage])

    const getHackathon = () => {
        axios.get(`/hackathon/${id}`)
            .then(res => {
                setHackathon(res.data)
                if (user && user.hasOwnProperty('hackathons')) {
                    setAssociated(user.hackathons.includes(id))
                    setIsOrganizer(res.data.organizer_id === user.id)
                    setAlreadyParticipatingInAProject(res.data.project_participants.includes(user.id))
                    setIsParticipant(user.hackathons.includes(id) && !(res.data.organizer_id === user.id))
                }
            })
            .catch(err => console.log('GET hacakthon error', err))
    }

    useEffect(() => {
        getHackathon()
    }, [user, id])


    const formattedStart = formatDate(hackathon.start_date)
    const formattedEnd = formatDate(hackathon.end_date)
    const singleDay = moment(hackathon.start_date).format('L') === moment(hackathon.end_date).format('L')


    const joinHackathon = () => {
        const reqBody = {
            id: hackathon._id
        }
        axios.post('/user/register', reqBody)
            .then(() => {
                setSuccessMessage("Congratulations! You're registered.")
                hackathon.participants += 1
                setAssociated(true)
                setErrorMessage("")
                axios.get('/user/').then(response => {
                      if (response.data.user) {
                        setUser({
                          loggedIn: true,
                          ...response.data.user
                        })
                      } else {
                        setUser({
                          loggedIn: false,
                          username: null
                        })
                      }
                    })
            })
            .catch(err => {
                setErrorMessage("Oh no, an error occured, could not register.")
                setSuccessMessage("")
            })
    }

    if (!hackathon.name || user === undefined) {
        console.log(hackathon, user)
        return (
            <Container>
                <InnerLoader />
            </Container>
        )
    }
    const params = new URLSearchParams(props.location.search)
    const origin = params.get('source')
    const origins = ['/explore', '/my-hackathons']
    return (
        <div className="hackathon-view">
            <img src={imgUrl} className="banner-img" alt="" width="100%"></img>
            <div className="content-overlay">
           
        <Segment>
                {isOrganizer && (
                    <Card.Content>
                        <Label color='purple' size="large" ribbon >
                            Organizing
                        </Label>
                    </Card.Content>
                )}
                 {isParticipant && (
                    <Card.Content>
                        <Label color='blue' size="large" ribbon >
                            Participating
                        </Label>
                    </Card.Content>
                )}
                
        <div className="container my-2 py-4">
                    {(origin && origins.includes(origin) && user.loggedIn) &&
                        (<Link to={origin}>
                            <IconButton content="Back" icon="left arrow"
                                callback={() => null}
                                labelPosition='left' />
                        </Link>)}

                    {successMessage && (
                        <Alert success={true} header={successMessage} />
                    )}
                    {errorMessage && (
                        <Alert success={false} header={errorMessage} />
                    )
                    }
                    <Row>
                        <Col md="7">
                            <img src={imgUrl} className="banner-img-inner mb-3" alt=""></img>
                        </Col>
                        <Col md="5">
                            {!hackathon ?
                                (<p>nothing </p>) :
                                (
                                    <>
                                        <Header as="h1">{hackathon.name}</Header>
                                        <DateTime 
                                            formattedStart={formattedStart} 
                                            formattedEnd={formattedEnd} 
                                            hackathon={hackathon}
                                            singleDay={singleDay}/>
                                        <Row>
                                            {(!isHackathonOrganizer && !associated && user.loggedIn) && (
                                                <Col xs="12" sm="6" lg="4" >
                                                    <Modal header={`Join ${hackathon.name}`}
                                                        buttonText="Join"
                                                        handleConfirmProps={() => joinHackathon()} />
                                                </Col>

                                            )}

                                        </Row>
                                 
                                    </>
                                
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <p>{hackathon.description}</p>
                        </Col>
                    </Row>
                </div>
            </Segment>
        <ProjectView 
        hackathon={hackathon}
        isOrganizer={isOrganizer}
        hackathonId={id} 
        alreadyParticipatingInAProject={alreadyParticipatingInAProject} />
            </div>
        </div>
    );
}

export default HackathonView;