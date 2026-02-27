import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSearchHistory, clearSearchHistory } from '../utils/storage';
import './Home.css';

const Home = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const handleClear = () => {
    clearSearchHistory();
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <div className="history-section">
      <div className="history-header">
        <h2>Recent Searches</h2>
        <button className="clear-btn" onClick={handleClear}>
          Clear All
        </button>
      </div>
      
      <div className="history-chips">
        {history.map((item, index) => (
          <Link 
            key={index} 
            to={`/search?q=${encodeURIComponent(item)}`} 
            className="history-chip"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;