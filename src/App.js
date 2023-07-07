import './App.css';
import { useState } from 'react';
import banner from './images/old-school-theater-banner.png';
import movieData from './data/data';
import MoviesBox from './components/MoviesBox/MoviesBox';

function App() {
  return (
    <main className="main-app">
      <img className='main-title' src={banner} alt='old school theater banner with the title rancid tomatillos' />
      <MoviesBox movies={movieData.movies} />
    </main>
  );
}

export default App;
