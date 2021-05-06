import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { Container, Header } from 'semantic-ui-react';
import InnerLoader from './load/InnerLoader';
import Modal from './ConfirmModal';
import Alert from './alert/Alert';
import IconButton from './button/IconButton';
import { Link } from 'react-router-dom';
import useAuthentication from '../utils/useAuthentication';

const formatDate = date => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const newDate = new Date(date);
    const d = newDate.getDate();
    const m = months[newDate.getMonth()];
    return [m, d];
};

function HackathonView(props) {
    const [hackathon, setHackathon] = useState({});
    const { id } = props.match.params;
    const [user]  = useAuthentication()
    const [associated, setAssociated] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const isHackathonOrganizer = user.id === hackathon.organizer_id;
    const imgUrl = hackathon.image
    
    useEffect(() =>  window.scrollTo(0, 0), [successMessage, errorMessage])
    
    useEffect(() => {
        console.log('comnponent mounted')
        axios.get(`/hackathon/${id}`)
        .then(res => {
            setHackathon(res.data)
            if (user && user.hasOwnProperty('hackathons')) {
                setAssociated(user.hackathons.includes(id))
            }
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [user, id])

    const formattedStart = formatDate(hackathon.start_date)
    const formattedEnd = formatDate(hackathon.end_date)
    const singleDay = (formattedStart[0] === formattedEnd[0] && 
        formattedStart[1] === formattedEnd[1])


    const joinHackathon = () => {
        const reqBody = {
            id: hackathon._id
        }
        axios.post('/user/register', reqBody)
        .then(res => {
            setSuccessMessage("Congratulations! You're registered.")
            setAssociated(true)
            setErrorMessage("")
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

    return (
        <div className="hackathon-view">
           <img src={imgUrl} className="banner-img" alt="" width="100%"></img>
           <div className="content-overlay">
               <div className="container my-5 py-2">
                  {(origin && user.loggedIn ) && 
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
                        { !hackathon ? 
                         (<p>nothing </p>) :
                          (
                          <>
                         
                          <Header as="h1">{hackathon.name}</Header>
                           <div className="text-center d-flex justify-content-between mb-4 w-50">
                               
                               <div xs="2">
                               <div className="date-box">
                                  <p className="month">{formattedStart[0]}</p>
                                  <p className="day">{formattedStart[1]}</p>
                               </div>
                               </div>
                               {!singleDay && (
                                <>
                                    <div  className="d-flex align-items-center">-</div>
                                    <div xs="2">
                                    <div className="date-box">
                                        <p className="month">{formattedEnd[0]}</p>
                                        <p className="day">{formattedEnd[1]}</p>
                                    </div>
                                    </div>
                               </>
                                   )}
                                  
                           </div>
                           {(!isHackathonOrganizer && !associated && user.loggedIn) && (
                           <Row>
                               <Col xs="12" md="6" lg="4" >
                                <Modal header={`Join ${hackathon.name}`} buttonText="Join" handleConfirmProps={() => joinHackathon() } />
                               </Col>
                           </Row>
                           )}
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
           </div>
        </div>
    );
}

export default HackathonView;