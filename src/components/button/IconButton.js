import React from 'react'
import { Button } from 'semantic-ui-react'


const IconButton = (props) => {
    const { content, labelPosition, icon, callback } = props
    return <Button className="mb-2" 
    content={content} icon={icon} 
    onClick={() => callback()}
    labelPosition={labelPosition} />
}

export default IconButton