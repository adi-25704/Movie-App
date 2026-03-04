import React from 'react';
import './movieCard.css';
import type { Movie } from '../types/movieTypes'; 

interface MovieCardProps {
  movie: Movie;
  openOverlay: (movie:Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, openOverlay }) => {
  const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='none' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E";
  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w342${movie.posterPath}`
    : placeholder;

  const releaseYear = movie.releaseDate ? movie.releaseDate.split('-')[0] : 'N/A';

  return (
      <div className="movie-card" onClick={() => openOverlay(movie)}>
        <div className="poster-container" onClick={() => openOverlay(movie)}>
          <img src={posterUrl} alt={movie.title} loading="lazy" />
          <div className="rating-badge">
            {movie.voteAvg.toFixed(1)}
          </div>
          {movie.adult && <div className="adult-badge">18+</div>}
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{releaseYear} • {movie.language.toUpperCase()}</p>
        </div>
      </div>
  );
};

export default MovieCard;