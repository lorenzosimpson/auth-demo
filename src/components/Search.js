import _ from 'lodash'
import faker from 'faker'
import React from 'react'
import { Search, Grid, Segment,  Item, Dropdown, Header, Divider} from 'semantic-ui-react'
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import axios from 'axios';
// import placeholder from '../assets/images/placeholder.png';
import history from '../history'
import NoHackathons from './Icon';
import SearchItem from './search/SearchItem';
import InnerLoader from './load/InnerLoader';
import moment from 'moment';
import useAuthentication from '../utils/useAuthentication';

const initialState = {
  loading: false,
  results: [],
  value: '',
}

const img = "https://source.unsplash.com/random/?coding&orientation=landscape"

function searchReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
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

function SearchExampleStandard(props) {
  const [state, dispatch] = React.useReducer(searchReducer, initialState)
  const { loading, results, value } = state
  const [source, setSource] = useState([])
  const [wasFiltered, setWasFiltered] = useState(false)
  const [noFilterResults, setNoFilterResults] = useState(false)
  // const { user } = useContext(SessionContext);
  const [user] = useAuthentication()
  const { noResults } = props;
  const [filter, setFilter] = useState([])
  const [currentSearchParam, setCurrentSearchParam] = useState('All Hackathons')
  const { searchURL } = props;


  useEffect(() => {
    if (Object.values(user).length) {
    axios.get(searchURL)
      .then(res => {
        const s = res.data
        const t = s.map(item => ({ ...item }))
        setSource(t)
      })
      .catch(err => console.log('GET hacakthon error', err))
    }
  }, [user])


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

  useEffect(() => {
    if (wasFiltered && filter.length === 0) {
      setNoFilterResults(true)
    }
    return () => setNoFilterResults(false) 
  }, [filter])

  useEffect(() => {
      setFilter(source)
  }, [source])



  const filterFn = (type) => {
    setWasFiltered(true)
    switch(type) {
      case 'past':
        setCurrentSearchParam("Past Hackathons")
        setFilter(_.filter(source, (o) => moment(o.end_date).isBefore(moment())))
        break
      case 'present':
        setCurrentSearchParam("Active Hackathons")
        setFilter(_.filter(source, (o) => moment().isBetween(moment(o.start_date), moment(o.end_date))))
        break
      case 'future':
        setCurrentSearchParam("Upcoming Hackathons")
        setFilter(_.filter(source, (o) => moment(o.start_date).isAfter(moment())))
        break
      case 'all':
        setCurrentSearchParam("All Hackathons")
        setFilter(source)
      default: 
        break
    }
  }

  const sortNewest = () => {
    setFilter(_.sortBy(filter, (o) => o.start_date))
  }

  const sortOldest = () => {
    const sorted = _.orderBy(filter, function(o) { return new moment(o.start_date); }, ['desc']);
    setFilter(sorted)
  }

  if (!source.length && !noResults && !noFilterResults) {
    return <InnerLoader />
  }

  return (
    <div class="mt-5">
     <Header as="h2">{currentSearchParam}</Header>
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
           
          <div class="dropdown-buttons">
           <Dropdown 
           text='Sort'
           className="icon"
           icon="sort"
           floating
           button
           labeled
           >
            <Dropdown.Menu>
              <Dropdown.Item onClick={sortNewest} text='Oldest to Newest' />
              <Dropdown.Item  onClick={sortOldest} text='Newest to Oldest' />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown 
            text='Filter'
            icon='filter'
            floating
            labeled
            button
            className='icon'
           >
            <Dropdown.Menu>
            <Dropdown.Item  onClick={() => filterFn('all')} text='All' />
            <Divider />
              <Dropdown.Item  onClick={() => filterFn('present')} text='Active' />
              <Dropdown.Item onClick={() => filterFn('past')} text='Past' />
              <Dropdown.Item  onClick={() => filterFn('future')} text='Upcoming' />
              
            </Dropdown.Menu>
          </Dropdown>
          </div>
         
            {
              noFilterResults || !filter.length ? (
                <NoHackathons />
              ) : (
                <>
                  {filter.map((item, key) =>
                    <SearchItem item={item} key={key} formatDate={formatDate} navigateToHackathonView={navigateToHackathonView} imgSrc={item.image} />
                  )
                  }
                </>
              )
            }
          </Item.Group>
        </Segment>
      </Grid.Column>
    </Grid>
    </div>
  )
}


export default SearchExampleStandard