import React, { useEffect, useState } from 'react';
import type {Movie} from '../types/movieTypes';
import { fetchMovies } from '../services/movieApi';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/movieCard';
import './searchResultsPage.css';

const SearchResultsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const currentPage = parseInt(searchParams.get('page') || '1');

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    // const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadMovies = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const data = await fetchMovies(query, currentPage); 
                setMovies(data); 
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [query, currentPage]);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ q: query, page: newPage.toString() });
        window.scrollTo(0, 0);
    };

    return (
        <div className="search-results-container">
            <header className="results-header">
                <h2>Results for: <span>{query}</span></h2>
            </header>

            {loading ? (
                <div className="loader">Loading Movies...</div>
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

            <div className="pagination">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchResultsPage;