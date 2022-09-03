import React from 'react'
import { useState, useEffect } from 'react'

import './App.css'
import MovieCard from './MovieCard'
import SearchIcon from './search.svg'



const API_URL = "http://www.omdbapi.com?apikey=f2ba0912";

const movie = {
  "Title": "Superman Returns",
  "Year": "2006",
  "imdbID": "tt0348150",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
}

const App = () => {
  const [searchTerm, setSearchTerm ] = useState('')
  const [ movies, setMovies ] = useState([])

  useEffect(() => {
    searchMovies(searchTerm)
  }, [])

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`)
    const data = await res.json()

    setMovies(data.Search)
  }

  return (
    <div className='app'>
      <h1>Movie Land</h1>
      <div className='search'>
        <input
          value={searchTerm}
          placeholder='Search for movies'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt='search' 
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <div className='container'>
        {movies?.length > 0 ? movies.map((movie, index) => 
          <MovieCard movie={movie} key={index} />
        ) : (
          <div className='empty'>
            <h2>Movies not found</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
