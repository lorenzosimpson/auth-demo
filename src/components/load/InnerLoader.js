import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const InnerLoader = () => (
  <Segment className="inner-loader">
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>
)

export default InnerLoader