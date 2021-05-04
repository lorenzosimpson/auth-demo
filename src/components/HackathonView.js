import React, { useEffect, useState } from 'react';
// import { SessionContext } from '../contexts/SessionContext';
import axios from 'axios';
// import banner from '../assets/images/computers-above.jpg';
import { Row, Col } from 'reactstrap';
import { Button, Container, Header } from 'semantic-ui-react';
import InnerLoader from './load/InnerLoader';

const imgUrl = 'https://source.unsplash.com/random/?coding&orientation=landscape'


function HackathonView(props) {
  //  const { user } = useContext(SessionContext);
    const [hackathon, setHackathon] = useState({})
    const { id } = props.match.params;


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
  //  const y = newDate.getFullYear().toString().substr(2);
    const d = newDate.getDate();
    const m = months[newDate.getMonth()];
    return [m, d];
};

    useEffect(() => {
        console.log('use effect called')
        axios.get(`/hackathon/${id}`)
        .then(res => {
            console.log('GET hackathon res', res)
            setHackathon(res.data)
        })
        .catch(err => console.log('GET hacakthon error', err))
        // eslint-disable-next-line
    }, [])

    const formattedStart = formatDate(hackathon.start_date)
    const formattedEnd = formatDate(hackathon.end_date)

    console.log(formattedStart, formattedEnd)
    const singleDay = (formattedStart[0] === formattedEnd[0] && 
        formattedStart[1] === formattedEnd[1])

    if (!hackathon.name) {
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
                           <Row className="text-center mb-4">
                               <Col xs="3">
                               <div className="date-box">
                                  <p className="month">{formattedStart[0]}</p>
                                  <p className="day">{formattedStart[1]}</p>
                               </div>
                               </Col>
                               {!singleDay && (
                                <>
                                    <Col xs="1" className="d-flex align-items-center">-</Col>
                                    <Col xs="3">
                                    <div className="date-box">
                                        <p className="month">{formattedEnd[0]}</p>
                                        <p className="day">{formattedEnd[1]}</p>
                                    </div>
                                    </Col>
                               </>
                                   )}
                           </Row>
                           <Row>
                               <Col>
                               <Button primary size="big">Join</Button>
                               </Col>
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
           </div>
        </div>
    );
}

export default HackathonView;