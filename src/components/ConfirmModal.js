import React, { useState } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

const ConfirmModal = props => {
    const [open, setOpen] = useState(false)
    const { buttonText, handleConfirmProps, header } = props;
    const show = () => setOpen(true)
    const handleConfirm = () => {
        setOpen(false)
        handleConfirmProps()
    }
    const handleCancel = () => setOpen(false)

    return (
        <div>
            <Button primary
            onClick={show}>{buttonText}</Button>
            <Confirm
                open={open}
                header={header}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    )
}

export default ConfirmModal
