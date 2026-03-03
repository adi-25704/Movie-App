import React, { useEffect, useState } from 'react';
import type {Movie} from '../types/movieTypes';
import { fetchMovies } from '../services/movieApi';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/movieCard';
import './searchResultsPage.css';
import MovieDetails from '../components/movieDetails';

const SearchResultsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const currentPage = parseInt(searchParams.get('page') || '1');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
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

    useEffect(() => {
        const storedMovie = sessionStorage.getItem('selectedMovie');
        if(storedMovie) {
            setSelectedMovie(JSON.parse(storedMovie));
        }
    },[])

    const handleCloseOverlay = () => {
        setSelectedMovie(null);
        sessionStorage.removeItem('selectedMovie');
    }

    const handleOpenOverlay = (movie:Movie) => {

        setSelectedMovie(movie);
        sessionStorage.setItem('selectedMovie', JSON.stringify(movie));

    }

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
                        <MovieCard key={movie.id} movie={movie} openOverlay={handleOpenOverlay}/>
                    ))}
                </div>
            )}

            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button disabled={movies.length === 0} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
            </div>
            <div>
                {selectedMovie && <MovieDetails movie = {selectedMovie} closeOverlay = {handleCloseOverlay}/>}
            </div>
        </div>
    );
};

export default SearchResultsPage;