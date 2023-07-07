import './App.css';
import banner from '../../images/old-school-theater-banner.png';
import movieData from '../../data/data';
import MoviesBox from '../MoviesBox/MoviesBox';
import SingleMovie from '../SingleMovie/SingleMovie';
import { useState } from 'react';

function App() {
  const [allMovies, setAllMovies] = useState(movieData.movies)
  const [singleMovie, setSingleMovie] = useState(null)
  console.log(allMovies)

  const viewMovie = (id) => {
    const selectedMovie = allMovies.find(movie => movie.id === id);
    setSingleMovie(selectedMovie)
  };

  return (
    <main className="main-app">
      <img className='main-title' src={banner} alt='old school theater banner with the title rancid tomatillos' />
      {singleMovie ? <SingleMovie selectedMovie={singleMovie} /> : <MoviesBox movies={allMovies} viewMovie={viewMovie}/>}
    </main>
  );
}

export default App;
