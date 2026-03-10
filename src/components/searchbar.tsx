import {useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { saveSearchQuery } from '../utils/storage';
import './searchbar.css';

function SearchBar({title, setTitle}: {title: string, setTitle: (title: string) => void}) {
  const navigate = useNavigate();
  const isClickLocked = useRef(false);
  const handleSearch = () => {
    const query = title.trim();
    if (query) 
    {
      if (isClickLocked.current) 
      {
        console.log("Very fast clicks.");
        return;
      }

      isClickLocked.current = true;
      setTimeout(() => { isClickLocked.current = false; }, 1000);
      navigate(`/Movie-App/search?q=${encodeURIComponent(query)}`);
    }
    else
    {
      navigate(`/Movie-App/`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const debouncedTitle = useDebounce(title.trim(), 500);

  useEffect(() => {

    if (debouncedTitle.trim()) {
      console.log('Navigating to search results for:', debouncedTitle);
      saveSearchQuery(debouncedTitle);
      navigate(`/Movie-App/search?q=${encodeURIComponent(debouncedTitle)}`);
    }
    else
    {
      console.log('Search query is empty or showTitle is false, navigating to home.');
      navigate(`/Movie-App/`);
    }
  }, [debouncedTitle, navigate]);

  return (
    <section id="SearchScreen" className="screen">
      <main className="search-container">
        <div className="search-group">
          <input 
            type="text" 
            placeholder='Enter the Movie Title...' 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search movies"
          />
          <button onClick={handleSearch}>
            Search Movies
          </button>
        </div>
      </main>
    </section>
  );
}

export default SearchBar;

