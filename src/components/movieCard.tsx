import React from 'react';
import { Link } from 'react-router-dom';
import './movieCard.css';
import type { Movie } from '../types/movieTypes'; 

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const releaseYear = movie.releaseDate ? movie.releaseDate.split('-')[0] : 'N/A';

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="poster-container">
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
    </Link>
  );
};

export default MovieCard;