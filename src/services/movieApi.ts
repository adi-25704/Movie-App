import type { Movie, Cast } from '../types/movieTypes';
import { mapMovieData } from '../utils/mapper';

const API_SESSION_TOKEN = import.meta.env.VITE_API_SESSION_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovies(query:string, page: number = 1): Promise<Movie[]>
{
    const url = `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    const options = {
        method: 'GET',
        headers: 
        {
            accept: 'application/json',
            Authorization: `Bearer ${API_SESSION_TOKEN}`
        }
    };
    try{
        const response = await fetch(url, options);

        if(!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
            
        console.log(data);
        return data.results.map(mapMovieData);
    }
    catch(error){
        console.error('Error fetching movies:', error);
        return [];    
    }
}

function fetchGenres()
{
    const url = `${BASE_URL}/genre/movie/list`
    const options = {
    method: 'GET',
    headers: 
    {
      accept: 'application/json',
      Authorization: `Bearer ${API_SESSION_TOKEN}`
    }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
}

function fetchCast(movieId: number)
{
    const url = `${BASE_URL}/movie/${movieId}/credits`
    const options = {
    method: 'GET',
    headers: 
    {
      accept: 'application/json',
      Authorization: `Bearer ${API_SESSION_TOKEN}`
    }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
}

export {fetchMovies, fetchGenres, fetchCast};