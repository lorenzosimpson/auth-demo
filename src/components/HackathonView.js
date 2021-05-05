import React, { useEffect, useState } from 'react';
// import { SessionContext } from '../contexts/SessionContext';
import axios from 'axios';
// import banner from '../assets/images/computers-above.jpg';
import { Row, Col } from 'reactstrap';
import { Button, Container, Header } from 'semantic-ui-react';
import InnerLoader from './load/InnerLoader';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import Modal from './ConfirmModal';
import Alert from './alert/Alert';

const imgUrl = 'https://source.unsplash.com/random/?coding&orientation=landscape'

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
    const { user } = useContext(SessionContext);    
    const [associated, setAssociated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const isHackathonOrganizer = user.id === hackathon.organizer_id;
    
    useEffect(() =>  window.scrollTo(0, 0), [successMessage, errorMessage])
    console.log(user)
    useEffect(() => {
        axios.get(`/hackathon/${id}`)
        .then(res => {
            setHackathon(res.data)
            setAssociated(user.hackathons.includes(id))
        })
        .catch(err => console.log('GET hacakthon error', err))
        // eslint-disable-next-line
    }, [])

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


    

    if (!hackathon.name || user.hackathons === undefined) {
        return (
            <Container>
                <InnerLoader />
            </Container>
        )
    }

    return (
        <div className="hackathon-view">
           <img src={imgUrl} className="banner-img" alt="" width="100%"></img>
           <div className="content-overlay">
               <div className="container my-5 py-5">
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
                           {(!isHackathonOrganizer && !associated) && (
                           <Row>
                               <Col xs="12" md="6" lg="4" >
                               {/* <Button primary className="w-100" size="big">Join</Button> */}
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