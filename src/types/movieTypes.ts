interface Movie {
    id: number
    title: string
    adult: boolean
    genre: number[]
    overview: string
    popularity: number
    posterPath: string
    releaseDate: string
    language: string
    voteAvg: number
    voteCount: number

}

interface Cast 
{
    actors: string[] //known for department is acting and order < 10
    directors: string[] //Job is Director
}
interface Genre
{
    id: number
    name: string
}
export type {Movie, Cast, Genre};

// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
//w92: Tiny thumbnail

// w185: Small (good for lists)

// w500: Medium (standard for movie cards)

// original: High resolution (use sparingly for detail pages)