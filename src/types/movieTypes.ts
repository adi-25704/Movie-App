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
    actors: string[]
    directors: string[]
}
interface Genre
{
    id: number
    name: string
}
export type {Movie, Cast, Genre};