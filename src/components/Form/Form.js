import { useEffect, useState } from "react"

const Form = ({resetMovies, filterByTitle, filterByRating}) => {
  const [searchData, setSearchData] = useState('')
  const [selectData, setSelectData] = useState('')

  const clearSearch = (e) => {
    e.preventDefault()
    resetMovies()
    setSearchData('')
  }

  const searchMovies = (e) => {
    setSearchData(e.target.value)
  }

  useEffect(() => {
    filterByTitle(searchData)
  }, [searchData])

  useEffect(() => {
    console.log(selectData)
    filterByRating(selectData)
  }, [selectData])
  return (
    <form onSubmit={clearSearch}>
      <input type='text' onChange={searchMovies} value={searchData}/>
      <select  onChange={(e) => setSelectData(e.target.value)} value={selectData}>
        <option value=''>Any</option>
        <option value='10'>10 stars</option>
        <option value='8'>Over 8 stars</option>
        <option value='5'>Over 5 stars</option>
        <option value='3'>Over 3 stars</option>
      </select>
    </form>
  )
}

export default Form