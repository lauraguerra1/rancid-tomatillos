import './App.css';
import banner from '../../images/old-school-theater-banner.png';
import movieData from '../../data/data';
import MoviesBox from '../MoviesBox/MoviesBox';
import SingleMovie from '../SingleMovie/SingleMovie';
import ExitMovie from '../ExitMovie/ExitMovie';
import { useState, useEffect } from 'react';
import { getAllMovies, getSingleMovie } from '../../apiCalls';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [singleMovie, setSingleMovie] = useState(null);
  const [movieNeeded, setMovieNeeded] = useState(null);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchApi = (request, setter, id) => {
    setLoading(true)
    const apiCall = async () => {
      try {
        setter(await request(id))
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
  
    apiCall()   
  }

  useEffect(() => {
    fetchApi(getAllMovies, setAllMovies)

    return () => setError('')
  }, [])

  useEffect(() => {
    if(movieNeeded) fetchApi(getSingleMovie, setSingleMovie, movieNeeded.id)

    return () => {
      setMovieNeeded(null)
      setError('')
    }
  }, [movieNeeded])

  const viewMovie = (id) => {
    const selectedMovie = allMovies.find(movie => movie.id === id);
    setMovieNeeded(selectedMovie)
  };

  const viewAll = () => {
    setSingleMovie(null);
  };

  return (
    <main className="main-app">
      {error && <h1 style={{color: 'red'}}>Something went wrong, please try again</h1>}
      {singleMovie ? 
        <>
          <ExitMovie viewAll={viewAll} />
          <SingleMovie selectedMovie={singleMovie} /> 
        </> : 
        <>
          <img className='main-title' src={banner} alt='old school theater banner with the title rancid tomatillos' />
          {loading && <h2 style={{color: 'red'}}>Loading...</h2>}
          <MoviesBox movies={allMovies} viewMovie={viewMovie}/>
        </>
      }
    </main>
  );
}

export default App;
