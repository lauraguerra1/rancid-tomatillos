import './Form.css'
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

const Form = ({resetMovies, filterMovies}) => {
  const [searchData, setSearchData] = useState('')
  const [selectData, setSelectData] = useState('["0","10"]')
  const [clearNeeded, setClearNeeded] = useState(false);

  useEffect(() => {
    if (searchData || selectData !== '["0","10"]') {
      setClearNeeded(true)
    } else {
      setClearNeeded(false)
    }
  }, [searchData, selectData])

  const clearSearch = (e) => {
    e.preventDefault()
    resetMovies()
    setSearchData('')
    setSelectData('["0","10"]')
  }

  const searchMovies = (e) => {
    setSearchData(e.target.value)
  }

  useEffect(() => {
    filterMovies(searchData, selectData)
  }, [searchData, selectData])

  return (
    <div className='search-container'>
      <div className='form-container'>
        <form className='search-movies' onSubmit={(e) => e.preventDefault()}>
          <input type='search' onChange={searchMovies} value={searchData} placeholder='search movie title'/>
          <div className='sml-screen-container'>
          <select className='search-rating' onChange={(e) => setSelectData(e.target.value)} value={selectData}>
            <option value={'["0","10"]'}>All Ratings 🍅</option>
            <option value={'["8","10"]'}>🍅 8-10</option>
            <option value={'["6","8"]'}>🍅 6-8</option>
            <option value={'["4","6"]'}>🍅 4-6</option>
            <option value={'["2","4"]'}>🍅 2-4</option>
            <option value={'["0","2"]'}>🍅 0-2</option>
          </select>
          {clearNeeded && <button type='button' className='material-symbols-outlined' id='clear-search-btn' onClick={clearSearch}>cancel</button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form

Form.propTypes = {
  resetMovies: PropTypes.func.isRequired,
  filterMovies: PropTypes.func.isRequired
}