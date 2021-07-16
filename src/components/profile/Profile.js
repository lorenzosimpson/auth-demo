import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, List } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserContext'

const ListExampleHeader = () => {
    const { user } = useContext(UserContext)
    return (
        <List>
            <List.Item>
                <List.Header>Username</List.Header>
                {user.username}
            </List.Item>
            <List.Item>
                <List.Header>Password</List.Header>
                <span class="mr-2">••••••••••</span>
               <Link>Change</Link>
            </List.Item>
        </List>
    )
}

export default ListExampleHeader