import { useState } from 'react'
import './App.css'
import { fetchMovies } from './services/movieApi'
import SearchBar from './components/searchbar'

function App() {
  const [count, setCount] = useState(0)
  



  return (
    <>
      <h1>Search Movies</h1>
      <SearchBar onSearch={async (title) => {
        try {
          const movies = await fetchMovies(title);
          console.log("Fetched movies:", movies);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }} />
    </>
  )
}

export default App
