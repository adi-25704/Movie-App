import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { saveSearchQuery } from '../utils/storage';
import './searchbar.css';

function SearchBar({title, setTitle}: {title: string, setTitle: (title: string) => void}) {
  const navigate = useNavigate();
  const handleSearch = () => {
    if (title.trim()) {
      navigate(`/Movie-App/search?q=${encodeURIComponent(title)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const debouncedTitle = useDebounce(title, 500);

  useEffect(() => {

    if(title.trim() === "") 
      {
        console.log('Search query is empty, not navigating.');
        return;
      }

    if (debouncedTitle.trim()) {
      console.log('Navigating to search results for:', debouncedTitle);
      saveSearchQuery(debouncedTitle);
      navigate(`/Movie-App/search?q=${encodeURIComponent(debouncedTitle)}`);
    }
    else
    {
      console.log('Search query is empty or showTitle is false, not navigating.');
    }
  }, [debouncedTitle, navigate, title]);

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

