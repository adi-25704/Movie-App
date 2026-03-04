import React, { useContext, useEffect, useState } from 'react';
import './movieDetails.css';
import type { Movie, Cast } from '../types/movieTypes'; 
import {fetchCast} from '../services/movieApi';
import { GenreContext } from '../App';

interface MovieDetailsProps {
  movie: Movie;
  closeOverlay: (movie: Movie) => void;
}



const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, closeOverlay }) => {
const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='none' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E";
const genres = useContext(GenreContext);
const [cast,setCast] = useState<Cast>({actors: [], directors: []});
const [loading, setLoading] = useState(false);

useEffect(() => {
        const loadCast = async () => {
            
            try {
                const data = await fetchCast(movie?.id || null); 

                setCast(data); 
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCast();
    }, [movie?.id]);


    const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w342${movie.posterPath}`
    : placeholder;
    console.log('Movie Details:', movie);
    return (
        <div className="movie-overlay" onClick={() => closeOverlay(movie)} role="dialog" aria-modal="true">
            <article className="movie-details-card" onClick={(e) => e.stopPropagation()}>
                <header className="overlay-header">
                    <button className="close-btn" onClick={() => closeOverlay(movie)} aria-label="Close details">
                        &times;
                    </button>
                </header>
                <div className="scrollable-content">
                    <div className="movie-details-grid">
                        <figure className="poster-aside">
                            <img src={posterUrl} alt={`Poster for ${movie.title}`} />
                        </figure>

                        <section className="info-main">
                            <h1>{movie.title}</h1>
                            
                            <div className="meta-badges">
                                <data value={movie.voteAvg}>⭐ {movie.voteAvg.toFixed(1)}</data>
                                <time dateTime={movie.releaseDate}>Release Year: {movie.releaseDate.split('-')[0]}</time>
                                <span className="lang">Language: {movie.language.toUpperCase()}</span>
                            </div>

                            <nav className="genres-list">
                                {movie.genre.map(id => (
                                    <span key={id} className="genre-tag">
                                        {genres.find(g => g.id === id)?.name}
                                    </span>
                                ))}
                            </nav>

                            <section>
                                <h2>Overview</h2>
                                <p className="overview-text">{movie.overview}</p>
                            </section>

                            <footer className="cast-section">
                                <h2>Cast & Crew</h2>
                                {loading ? (
                                    <div role="status">Loading cast...</div>
                                ) : (
                                    <dl className="cast-description-list">
                                        <dt>Actors</dt>
                                        <dd>{cast.actors.join(', ')}</dd>
                                        
                                        <dt>Directors</dt>
                                        <dd>{cast.directors.join(', ')}</dd>
                                    </dl>
                                )}
                            </footer>
                        </section>
                    </div>
                </div>
            </article>
        </div>
    );

}


export default MovieDetails;