import './App.css';
import banner from '../../images/old-school-theater-banner.png';
import movieData from '../../data/data';
import MoviesBox from '../MoviesBox/MoviesBox';
import SingleMovie from '../SingleMovie/SingleMovie';
import ExitMovie from '../ExitMovie/ExitMovie';
import { useState, useEffect } from 'react';
import { getAllMovies } from '../../apiCalls';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [singleMovie, setSingleMovie] = useState(null);
  const [error, setError] = useState('')

  useEffect(() => {
    const apiCall = async () => {
      try {
        setAllMovies(await getAllMovies())
      } catch (error) {
        setError(error)
      }
    }
    apiCall()
  }, [])

  const viewMovie = (id) => {
    const selectedMovie = allMovies.find(movie => movie.id === id);
    setSingleMovie(selectedMovie);
  };

  const viewAll = () => {
    setSingleMovie(null);
  };

  return (
    <main className="main-app">
      {singleMovie ? 
        <>
          <ExitMovie viewAll={viewAll} />
          <SingleMovie selectedMovie={singleMovie} /> 
        </> : 
        <>
          <img className='main-title' src={banner} alt='old school theater banner with the title rancid tomatillos' />
          <MoviesBox movies={allMovies} viewMovie={viewMovie}/>
        </>
      }
    </main>
  );
}

export default App;
