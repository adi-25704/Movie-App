import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './movieDetails.css';
import type { Movie, Cast } from '../types/movieTypes'; 
import {fetchCast} from '../services/movieApi';
import { GenreContext } from '../App';

interface MovieDetailsProps {
  movie: Movie;
  closeOverlay: (movie: Movie) => void;
}



const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, closeOverlay }) => {

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
    : 'https://via.placeholder.com/550x750?text=No+Poster';
    console.log('Movie Details:', movie);
    return (
        <div className="movie-details-card" onClick={() => closeOverlay(movie)}>
            <div className="movie-details-content">
                <img src={posterUrl} alt={movie.title} loading="lazy" />
                <h2>{movie.title}</h2>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Genres: {movie.genre.map(id => genres.find(g => g.id === id)?.name).join(', ')}</p>
                <p>Language: {movie.language.toUpperCase()}</p>
                <p>Rating: {movie.voteAvg.toFixed(1)}</p>
                <p>{movie.overview}</p>
                <p>{loading ? "Loading cast..." : `Cast:\n actors: ${cast.actors.join(', ')}\n directors: ${cast.directors.join(', ')}`}</p>
                
                <Link to="/" onClick={() => closeOverlay(movie)}>Back to Search</Link>
            </div>
        </div>
    );

}


export default MovieDetails;