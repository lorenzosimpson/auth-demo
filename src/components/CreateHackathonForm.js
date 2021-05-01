import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Card, CardBody, Row, Label, FormGroup, Container, Button} from 'reactstrap';
import { DateTimePicker } from 'react-rainbow-components';
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';

function CreateHackathonForm(props) {
    const [hackathonData, setHackathonData] = useState({})
    const [startDate, changeStartDate] = useState(new Date())
    const [endDate, changeEndDate] = useState(new Date());
    const { user } = useContext(SessionContext);
    console.log(user)

    function handleChange(e) {
        setHackathonData({
            ...hackathonData,
            [e.target.name]: e.target.value
        })
        console.log(hackathonData)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const submitData = {
            ...hackathonData,
            start_date: startDate,
            end_date: endDate,
            organizer_id: user.id
        }

        axios.post('/hackathon', submitData)
        .then(response => {
            console.log(response)
        })
        .catch(err => console.log(err))
    }

    function handleInvalidSubmit(e) {
        e.preventDefault()
        console.log('invalid submit!')
    }


    return (
        <Container fluid={true}>
            <Row className="justify-content-center">
                <Card className="col-11 col-lg-5 col-xl-4 col-md-8">
                    <CardBody>
                        <AvForm onChange={handleChange} onValidSubmit={handleSubmit}  >
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <AvInput id="name"  name="name" required
                                placeholder="UCLA Spring Hackathon, etc." />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <AvInput id="location"  name="location"
                                required
                                placeholder="Address, Online/Remote, etc." />
                            </FormGroup>
                            <FormGroup>
                                <Label for="about">Details</Label>
                                <AvInput type="textarea" 
                                name="description"
                                id="about"
                                required
                                placeholder="Tell potential participants about this hackathon" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="startDate">Start Date</Label>
                                <DateTimePicker
                                    id="startDate"
                                    name="startDate"
                                    onChange={changeStartDate}
                                    value={startDate}
                                    minDate={new Date()}
                                />
                              
                            </FormGroup>

                            <FormGroup>
                                <Label for="endDate">End Date</Label>
                                <DateTimePicker
                                    name="endDate"
                                    onChange={changeEndDate}
                                    value={endDate}
                                    minDate={new Date()}
                                    placeholder="Choose End Date and Time"  
                                />
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                            <Button color="primary" type="submit">Submit</Button>
                            </div>
                        </AvForm>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    );
}

export default CreateHackathonForm;