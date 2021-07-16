import _ from 'lodash'
import React from 'react'
import { Search, Grid, Segment, Icon,  Item, Header } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import history from '../../history'
import NoHackathons from '../NoItems';
import SearchItem from './SearchItem';
import InnerLoader from '../load/InnerLoader';
import moment from 'moment';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { formatDateYear } from '../../utils/dateFormats';
import Dropdowns from './Dropdowns';

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
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }
    default:
      throw new Error()
  }
}

const resultRenderer = ({ name, description, _id }) => [
  <div key='content' className='content' onClick={() => navigateToHackathonView(_id)}>
    {name && <div className='title'>{name}</div>}
    {description && <div className='description'>{description}</div>}
  </div>,
]

const navigateToHackathonView = (id, source) => {
  history.push(`/hackathons/${id}?source=${source}`)
}


function SearchExampleStandard(props) {
  const [state, dispatch] = React.useReducer(searchReducer, initialState)
  const { loading, results, value } = state
  const [source, setSource] = useState([])
  const [wasFiltered, setWasFiltered] = useState(false)
  const [noFilterResults, setNoFilterResults] = useState(false)
  const { user } = useContext(UserContext);
  const { noResults, setNoResults } = props;
  const [filter, setFilter] = useState([])
  const [currentSearchParam, setCurrentSearchParam] = useState('All Hackathons')
  const { searchURL } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);


  useEffect(() => {
    if (Object.values(user).length) {
    axios.get(searchURL)
      .then(res => {
        const s = res.data
        if (res.data.length === 0) setNoResults(true)
        const t = s.map(item => ({ ...item }))
        setSource(t)
      })
      .catch(err => console.log('GET hacakthon error', err))
    }
    //eslint-disable-next-line
  }, [user])


  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
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
  }, [filter, wasFiltered])

  useEffect(() => {
      setFilter(source)
  }, [source])

/**
 * Set the filtered results depending on the filter type string passed in
 * @param type - string describing the type of filtering desired
 */
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
        break
      case 'organizer':
        setCurrentSearchParam('Organizing')
        setFilter(_.filter(source, (o) => o.organizer_id === user.id))
        break
      case 'participant':
        setCurrentSearchParam('Participating')
        setFilter(_.filter(source, (o) => o.organizer_id !== user.id))
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

  const sortDropdown = [
    { name: 'Oldest > Newest', callback: sortNewest},
    { name: 'Newest > Oldest', callback: sortOldest}
  ]
  const filterDropdown = [
    { name: 'All', callback: () => filterFn('all')},
    { name: 'Current', callback: () => filterFn('present')},
    { name: 'Past', callback: () => filterFn('past')},
    { name: 'Future', callback: () => filterFn('future')},
    { divider: true },
    { name: 'Organizing', callback: () => filterFn('organizer')},
    { name: 'Participating', callback: () => filterFn('participant')},
  ]

  return (
    <div className="mt-5">
     <Header as="h2">{currentSearchParam}</Header>
    <Grid>
      <Grid.Column >
        <div className="d-flex justify-content-center">
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
          <div className="dropdown-buttons mb-2">
           <Dropdowns 
            dropdownItems={sortDropdown}
            icon={<Icon name='sort' />} title='Sort' />
         
         {/* exclude the filter my hackathons button on explore page, as they're all not associated hackathons */}
         {window.location.pathname !== '/explore' && (
             <Dropdowns 
            dropdownItems={filterDropdown}
            icon={<Icon name='filter' />} title='Filter' />
         )}
            </div>
            {
              noFilterResults || !filter.length ? (
                <NoHackathons />
              ) : (
                <>
                  {filter.map((item, key) =>
                    <SearchItem item={item} key={key} formatDate={formatDateYear} navigateToHackathonView={navigateToHackathonView} imgSrc={item.image} />
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