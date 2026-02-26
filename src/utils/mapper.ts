import type {Movie} from '../types/movieTypes';

function mapMovieData(movieData: any): Movie {
    const movie: Movie = {
        id: movieData.id,
        title: movieData.title,
        adult: movieData.adult,
        genre: movieData.genre_ids,
        overview: movieData.overview,
        popularity: movieData.popularity,
        posterPath: movieData.poster_path,
        releaseDate: movieData.release_date,
        language: movieData.original_language,
        voteAvg: movieData.vote_average,
        voteCount: movieData.vote_count
    };
    return movie;
}

export {mapMovieData};