import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { saveSearchQuery } from '../utils/storage';

import '../index.css';

function SearchBar() {
  const [title, setTitle] = useState("");
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

  const debouncedTitle = useDebounce(title, 1000);

  useEffect(() => {
    if (debouncedTitle.trim()) {
      saveSearchQuery(debouncedTitle);
      navigate(`/search?q=${encodeURIComponent(debouncedTitle)}`);
    }
  }, [debouncedTitle, navigate]);


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

