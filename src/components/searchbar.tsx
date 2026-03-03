import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { saveSearchQuery } from '../utils/storage';


import '../index.css';

function SearchBar({title, setTitle}: {title: string, setTitle: (title: string) => void}) {
  const navigate = useNavigate();
  const handleSearch = () => {
    if (title.trim()) {
      navigate(`/search?q=${encodeURIComponent(title)}`);
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
      navigate(`/search?q=${encodeURIComponent(debouncedTitle)}`);
    }
    else
    {
      console.log('Search query is empty or showTitle is false, not navigating.');
    }
  }, [debouncedTitle, navigate, title]);

  return (
    <section id="SearchScreen" className="screen">
      <main>
        <input 
          type="text" 
          placeholder='Enter the Movie Title...' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          Search Movies
        </button>
      </main>
    </section>
  );
}

export default SearchBar;

