import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Row, Container} from 'reactstrap';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { DateTimePicker } from 'react-rainbow-components';
import useAuthentication from '../utils/useAuthentication';
import history from '../history';

function CreateHackathonForm(props) {
    const [hackathonData, setHackathonData] = useState({})
    const [startDate, changeStartDate] = useState(new Date())
    const [endDate, changeEndDate] = useState(new Date());
    // const { user } = useContext(SessionContext);
    const [user] = useAuthentication();
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
            history.push('/explore')
        })
        .catch(err => console.log(err))
    }


    return (
        <Container className="mb-4">
            <Row className="justify-content-center">
                <Card className="col-11 col-lg-5 col-xl-4 col-md-8">
                    <CardBody>

                       <Form onChange={handleChange} onSubmit={handleSubmit}  >
                              <Form.Field>
                                <label for="name">Name</label>
                                <input id="name"  name="name" required
                                placeholder="UCLA Spring Hackathon, etc." />
                            </Form.Field>
                           <Form.Field>
                                <label for="location">Location</label>
                                <input id="location"  name="location"
                                required
                                placeholder="Address, Online/Remote, etc." />
                            </Form.Field>
                            <Form.Field>
                                <label for="about">Details</label>
                                <TextArea
                                name="description"
                                id="about"
                                required
                                placeholder="Tell potential participants about this hackathon" />
                            </Form.Field>

                           <Form.Field>
                                <label for="startDate">Start Date</label>
                                <DateTimePicker
                                    id="startDate"
                                    name="startDate"
                                    onChange={changeStartDate}
                                    value={startDate}
                                    minDate={new Date()}
                                />
                
                            </Form.Field>

                            <Form.Field>
                                <label for="endDate">End Date</label>
                                <DateTimePicker
                                    name="endDate"
                                    onChange={changeEndDate}
                                    value={endDate}
                                    minDate={new Date()}
                                    placeholder="Choose End Date and Time"  
                                />
                            </Form.Field>

                            <div className="d-flex justify-content-end">
                                <Button primary type="submit">Submit</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    );
}

export default CreateHackathonForm;