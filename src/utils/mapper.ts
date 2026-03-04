import type {Movie, Cast} from '../types/movieTypes';

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

function mapCastData(castData: any): Cast {
    const cast:Cast ={
        actors: castData.cast.filter((member: any) => member.known_for_department === 'Acting' && member.order < 10).map((member: any) => member.name),
        directors: castData.crew.filter((member: any) => member.known_for_department === 'Directing' && member.job === 'Director').map((member: any) => member.name)
    }     
    return cast;
}

function movieSortByPopularity(movies: Movie[]): Movie[] {
    return movies.sort((a, b) => b.popularity - a.popularity);
}
    
export {mapMovieData, mapCastData, movieSortByPopularity};