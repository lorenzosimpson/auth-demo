import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function ProjectModal(props) {
  const [open, setOpen] = React.useState(false)
  const { image, description, name } = props
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
        <Button  onClick={() => setOpen(false)}>
          No Thanks
        </Button>
        <Button
          content="Join"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ProjectModal
