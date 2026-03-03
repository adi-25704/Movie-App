import './App.css'
import myLogo from './assets/Movie_Logo.png';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import SearchBar from './components/searchbar';
import SearchResultsPage from './pages/searchResultsPage';
import Home from './pages/home';
import { fetchGenres } from './services/movieApi';
import type { Genre } from './types/movieTypes';
import { useEffect, useState, createContext  } from 'react';

export const GenreContext = createContext<any[]>([]);

function App() {
  const [title, setTitle] = useState("");
  const [genre,setGenre] = useState<Genre[]>([]);
  
  useEffect(() => {
    const loadGenres = async () => {
    try {
      const genres:Genre[] = await fetchGenres();
      setGenre(genres);
    }
    catch (error) {
      throw new Error(`Error loading genres: ${error}`);
    }
  }

  loadGenres();
  },[]);
  
  const handleReset = () => {
    setTitle("");
    sessionStorage.removeItem('selectedMovie');
  }
  
  return (
    
    <BrowserRouter>
    
      <div className="app-container">
        <div className="app-header">
          <Link to="/" onClick={handleReset}>
            <img src={myLogo} alt="Movie Finder Logo" className="logo" />
          </Link>
          <h1>Movie Finder</h1>
        </div>
        <GenreContext.Provider value={genre}>
        <SearchBar title={title} setTitle={setTitle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
        </GenreContext.Provider>        
      </div>
    </BrowserRouter>
  )
}

export default App;