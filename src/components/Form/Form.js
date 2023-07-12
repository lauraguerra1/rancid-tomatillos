import './Form.css'
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

const Form = ({resetMovies, filterMovies}) => {
  const [searchData, setSearchData] = useState('')
  const [selectData, setSelectData] = useState('["0","10"]')

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
    <div className='form-container'>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='search' onChange={searchMovies} value={searchData} placeholder='search for a movie title'/>
        <select onChange={(e) => setSelectData(e.target.value)} value={selectData}>
          <option value={'["0","10"]'}>Any</option>
          <option value={'["8","10"]'}>8-10</option>
          <option value={'["6","8"]'}>6-8</option>
          <option value={'["4","6"]'}>4-6</option>
          <option value={'["2","4"]'}>2-4</option>
          <option value={'["0","2"]'}>0-2</option>
        </select>
      </form>
      <button className='material-symbols-outlined' onClick={clearSearch}>cancel</button>
    </div>
  )
}

export default Form

Form.propTypes = {
  resetMovies: PropTypes.func.isRequired,
  filterMovies: PropTypes.func.isRequired
}