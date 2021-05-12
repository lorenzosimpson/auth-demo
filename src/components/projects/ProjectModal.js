import axios from 'axios'
import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function ProjectModal(props) {
  const [open, setOpen] = React.useState(false)
  const { image, description, name, project_id } = props

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
        <Button  onClick={() => setOpen(false)}>
          No Thanks
        </Button>
        <Button
          content="Join"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleJoin()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ProjectModal
