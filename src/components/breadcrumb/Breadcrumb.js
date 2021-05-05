import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import history from '../../history';

const BreadcrumbExample = (props) => {
    const { steps } = props;
    const last = steps.length - 1
    return (
        <div className="breadcrumb-container">
        <Breadcrumb>
            {steps.map((step, index) => (
                <>
                <Breadcrumb.Section active={index === last}
                 onClick={() => history.push(step.destination)}
                 link>{step.content}</Breadcrumb.Section>
                 {(index !== last || index === 0) && <Breadcrumb.Divider />}
                </>
            ))}
        </Breadcrumb>
        </div>
    )
}

export default BreadcrumbExample