import _ from 'lodash'
import faker from 'faker'
import React from 'react'
import { Search, Grid, Header, Segment, Label, Item, Image } from 'semantic-ui-react'
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import axios from 'axios';
import placeholder from '../assets/images/placeholder.png';
import history from '../history'

const initialState = {
  loading: false,
  results: [],
  value: '',
}

// const source = _.times(5, () => ({
//     name: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$'),
//   }))

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
        console.log(action)
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}
 const resultRenderer = ({ name, description, title, _id }) => [
    <div key='content' className='content' onClick={() => navigateToHackathonView(_id)}>
      {name && <div className='title'>{name}</div>}
      {description && <div className='description'>{description}</div>}
    </div>,
  ]

  const navigateToHackathonView = id => {
    history.push(`/hackathon/${id}`)
}


function SearchExampleStandard(props) {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state
  const [source, setSource] = useState([])
  const { user } = useContext(SessionContext);

  useEffect(() => {
        console.log('use effect called')
        axios.get(`/hackathon/u/${user.id}`)
        .then(res => {
            const s = res.data
            const t = s.map(item =>( {...item, image: faker.internet.avatar() }))
            setSource(t)
        })
        .catch(err => console.log('GET hacakthon error', err))
    }, [])


  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        console.log('clean')
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.name)
      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      })
    }, 300)
  }, [source])

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])


  return (
    <Grid>
      <Grid.Column >
          <div class="d-flex justify-content-center">
        <Search
          loading={loading}
          onResultSelect={(e, data) =>
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.name })
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
          resultRenderer={resultRenderer}
          
        />
        </div>

        <Segment>
          <Header>Search</Header>
          <Item.Group>
          {source.map((item, key) => (
                  <Item onClick={() => navigateToHackathonView(item._id)}>
                  <Item.Image  width="50px" src={placeholder} />
                  <Item.Content>
                    <Item.Header >{item.name}</Item.Header>
                    <Item.Meta>Details</Item.Meta>
                    <Item.Description>
                        {item.description}
                    </Item.Description>
                    <Item.Extra>{item.start_date}</Item.Extra>
                    <Item.Extra>{item.end_date}</Item.Extra>
                  </Item.Content>
                </Item>
   
          ))}
          </Item.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

// const source = [
//     {
//         _id: "608def1880a68e1c6a58b26f",
//         end_date: "2021-05-02T20:00:00.000Z",
//         name: "Dangles’ Hackathon",
//         organizer_id: "608dbf1790e6fb091649bcdf",
//         start_date: "2021-05-02T16:00:00.000Z",
//     }
// ]

export default SearchExampleStandard