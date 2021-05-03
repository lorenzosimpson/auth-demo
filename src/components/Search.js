import _ from 'lodash'
import faker from 'faker'
import React from 'react'
import { Search, Grid, Header, Segment, Label, Item, Image } from 'semantic-ui-react'
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import axios from 'axios';
import placeholder from '../assets/images/placeholder.png';
import history from '../history'
import Icon from './Icon';
import SearchItem from './search/SearchItem';

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function searchReducer(state, action) {
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
  const [state, dispatch] = React.useReducer(searchReducer, initialState)
  const { loading, results, value } = state
  const [source, setSource] = useState([])
  const { user } = useContext(SessionContext);
  const [load, setLoad] = useState(false)

  const formatDate = date => {
    const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
    ];
    const newDate = new Date(date);
    const y = newDate.getFullYear().toString().substr(2);
    const d = newDate.getDate();
    const m = months[newDate.getMonth()];
    return `${m}/${d}/${y}`;
};

  useEffect(() => {
        setLoad(true)
        console.log('use effect called')
        axios.get(`/hackathon/u/${user.id}`)
        .then(res => {
            const s = res.data
            const t = s.map(item =>( {...item, image: faker.internet.avatar() }))
            setSource(t)
            setLoad(false)
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
          placeholder="Search Hackathons"
          
        />
        </div>

      
        <Segment>
          <Item.Group>
          {
           !source.length ? (
             <Icon />
           ) : (
            <>
               {source.map((item, key) =>
               (
                  <SearchItem item={item} formatDate={formatDate} navigateToHackathonView={navigateToHackathonView} imgSrc={placeholder}/>
              ))
              }
            </>
           )
          }
          </Item.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}


export default SearchExampleStandard