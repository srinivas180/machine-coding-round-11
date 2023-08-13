import { useContext, useEffect, useState } from "react";
import { Movie } from "../../components/Movie";
import { MoviesContext } from "../../contexts/MoviesContext";
import { SearchContext } from "../../contexts/SearchContext";
import "./index.css";

export function Home() {
    const [genres, setGenres] = useState([]);
    const [releaseYears, setReleaseYears] = useState([]);
    const { searchQuery } = useContext(SearchContext);
    const { movies } = useContext(MoviesContext);
    const [movie, setMovie] = useState({
        title: "",
        summary: "",
        year: "",
        genre: "",
        cast: "",
        rating: "",
        director: "",
        writer: "",
        imageURL: "",
    });
    const [filters, setFilters] = useState({
        genre: "",
        releaseYear: "",
        rating: "",
    });

    let filteredMovies = movies;

    if (searchQuery != "") {
        filteredMovies = filteredMovies.filter(
            (movie) =>
                //title
                movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                //cast
                movie.cast.find((castItem) =>
                    castItem.toLowerCase().includes(searchQuery.toLowerCase())
                ) ||
                //director
                movie.director.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (filters.genre !== "") {
        filteredMovies = filteredMovies.filter((movie) =>
            movie.genre.includes(filters.genre)
        );
    }

    if (filters.releaseYear !== "") {
        filteredMovies = filteredMovies.filter(
            (movie) => movie.year === Number(filters.releaseYear)
        );
    }

    if (filters.rating !== "") {
        filteredMovies = filteredMovies.filter(
            (movie) => movie.rating >= Number(filters.rating)
        );
    }

    useEffect(() => {
        setGenres(
            movies.reduce((genreAccumulator, movie) => {
                return [...new Set([...movie.genre, ...genreAccumulator])];
            }, [])
        );
    }, []);

    useEffect(() => {
        const currentYear = new Date().getUTCFullYear();
        const years = Array(currentYear - (currentYear - 35))
            .fill("")
            .map((v, index) => currentYear - index);
        setReleaseYears(years);
    }, []);

    return (
        <div>
            <div>
                <h2>Movies</h2>
                <select
                    onChange={(e) =>
                        setFilters({ ...filters, genre: e.target.value })
                    }
                >
                    <option value="">All genre</option>
                    {genres.map((genre) => (
                        <option value={genre}>{genre}</option>
                    ))}
                </select>
                <select
                    onChange={(e) =>
                        setFilters({ ...filters, releaseYear: e.target.value })
                    }
                >
                    <option value="">Release year</option>
                    {releaseYears.map((year) => (
                        <option value={year}>{year}</option>
                    ))}
                </select>
                <select
                    onChange={(e) =>
                        setFilters({ ...filters, rating: e.target.value })
                    }
                >
                    <option value="">Rating</option>
                    <option value="1">1 and above</option>
                    <option value="2">2 and above</option>
                    <option value="3">3 and above</option>
                    <option value="4">4 and above</option>
                    <option value="5">5 and above</option>
                    <option value="6">6 and above</option>
                    <option value="7">7 and above</option>
                    <option value="8">8 and above</option>
                    <option value="9">9 and above</option>
                    <option value="10">10</option>
                </select>
                <button className="button button--primary">Add movie</button>
            </div>
            <div className="movies">
                {filteredMovies.length === 0
                    ? "No results found"
                    : filteredMovies.map((movie) => (
                          <Movie key={movie.id} movie={movie} />
                      ))}
            </div>
            <div className="modal">
                <div className="modal__content"></div>
            </div>
        </div>
    );
}
