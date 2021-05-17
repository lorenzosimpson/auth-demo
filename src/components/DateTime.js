import React from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { Statistic } from 'semantic-ui-react';



function DateTime(props) {
    const { formattedEnd, formattedStart, singleDay, hackathon } = props;
    return (
        <Row className="mb-5">
            <Col xs="12">
               
                { 
                    singleDay ? (
                        <>
                        {formattedStart} - {moment(hackathon.end_date).format('h:mm A')}
                        </>
                    ) : (
                        <>
                        {formattedStart} - {formattedEnd}
                        </>
                    )
                }




             
            </Col>

            <Col>
               
                {hackathon.participants}&nbsp;
                Participants
               
            </Col>
        </Row>
    );
}

export default DateTime;