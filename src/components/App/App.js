import './App.css';
import banner from '../../images/old-school-theater-banner.png';
import movieData from '../../data/data';
import MoviesBox from '../MoviesBox/MoviesBox';
import SingleMovie from '../SingleMovie/SingleMovie';
import ExitMovie from '../ExitMovie/ExitMovie';
import { useState } from 'react';

function App() {
  const [allMovies, setAllMovies] = useState(movieData.movies);
  const [singleMovie, setSingleMovie] = useState(null);

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
