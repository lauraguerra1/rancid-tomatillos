import './App.css';
import banner from '../../images/old-school-theater-banner.png';
import MoviesBox from '../MoviesBox/MoviesBox';
import SingleMovie from '../SingleMovie/SingleMovie';
import ExitMovie from '../ExitMovie/ExitMovie';
import { useState, useEffect } from 'react';
import { getAllMovies } from '../../apiCalls';
import { Routes, Route, useLocation} from 'react-router-dom'

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation();

  const fetchApi = (request, setter, id) => {
    setLoading(true)
    const apiCall = async () => {
      try {
        setter(await request(id))
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
  
    apiCall()   
  }

  useEffect(() => {
    fetchApi(getAllMovies, setAllMovies)

    return () => setError('')
  }, [])

  return (
    <main className="main-app">
      <figure className='title-container'>
        <img className='main-title' src={banner} alt='old school theater banner with the title rancid tomatillos' />
        {location.pathname !== "/" && <ExitMovie />}
      </figure>
      {error && <h1 style={{color: 'red'}}>{error.message}</h1>}
      {loading && <div className='loading-container'><span className='loading'></span></div>}
      <Routes>
        <Route path="/" element={<MoviesBox movies={allMovies} />} />
        <Route path='/:id' element={<SingleMovie fetchApi={fetchApi} setError={setError} />} />
      </Routes>
    </main>
  );
}

export default App;