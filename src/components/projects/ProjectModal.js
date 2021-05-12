import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserContext'

function ProjectModal(props) {
  const [open, setOpen] = React.useState(false)
  const { image, description, name, project_id, userHasJoined, alreadyParticipatingInAProject } = props
  const { user } = useContext(UserContext)

  const handleJoin = () => {
      axios.post('/project/join', {
          project_id: project_id
      })
      .then(response => {
          console.log(response)
          console.log('successful project registration')
          setOpen(false)
      })
      .catch(err => {
          console.log(err)
      })
  }
  console.log(props)
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button labelPosition="right" icon="info circle" content="Details"></Button>}
    >
      <Modal.Header>{name}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={image} alt="" wrapped />
        <Modal.Description>
          <p>
           {description}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        { (!userHasJoined && !alreadyParticipatingInAProject) ? (
            <>
            <Button  onClick={() => setOpen(false)}>
            No Thanks
            </Button>
            <Button
            content="Join"
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleJoin()}
            positive />
        </> 
        ) : (
            <Button onClick={() => setOpen(false)}>Close</Button>
        )
        }
      </Modal.Actions>
    </Modal>
  )
}

export default ProjectModal
