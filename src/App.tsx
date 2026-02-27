import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './components/searchbar';
import SearchResultsPage from './pages/searchResultsPage';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <h1>Movie Finder</h1>
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {/* <Route path="/movie/:id" element={<MovieDetailsPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;