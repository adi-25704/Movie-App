const HISTORY_KEY = 'movie_search_history';

export const saveSearchQuery = (query: string) => {
  if (!query.trim()) return;
  
  const existing = getSearchHistory();

  const updated = [query, ...existing.filter(q => q !== query)].slice(0, 5);
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const getSearchHistory = (): string[] => {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearSearchHistory = () => {
  localStorage.removeItem('movie_search_history');
};