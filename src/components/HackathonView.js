import React, { useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import axios from 'axios';
import banner from '../assets/images/computers-above.jpg';
import { Row, Col } from 'reactstrap';
import { Header } from 'semantic-ui-react';
import { format } from 'morgan';


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
    const y = newDate.getFullYear().toString().substr(2);
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
    }, [])

    return (
        <div className="hackathon-view">
           <img src={banner} className="banner-img" width="100%"></img>
           <div className="content-overlay">
               <div className="container pt-5">
                   <Row>
                       <Col md="7">
                   <img src={banner} className="banner-img-inner"></img>
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
                                  <p className="month">{formatDate(hackathon.start_date)[0]}</p>
                                  <p className="day">{formatDate(hackathon.start_date)[1]}</p>
                               </div>
                               </Col>
                               <Col xs="2">-</Col>
                               <Col xs="3">
                               <div className="date-box">
                                  <p className="month">{formatDate(hackathon.end_date)[0]}</p>
                                  <p className="day">{formatDate(hackathon.end_date)[1]}</p>
                               </div>
                               </Col>
                           </Row>
                           <p>{hackathon.description}</p>
                           </>
                           )

                        }
                       </Col>
                   </Row>
               </div>
           </div>
        </div>
    );
}

export default HackathonView;