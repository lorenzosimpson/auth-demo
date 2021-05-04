import React from 'react'
import { Message } from 'semantic-ui-react'

const Alert = (props) => {
    const { header, list, success } = props;
    return (
        <Message
            success={success}
            error={!success}
            header={header}
            list={list}
        />
    )
}

export default Alert