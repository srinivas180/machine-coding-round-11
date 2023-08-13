import { useContext, useEffect, useState } from "react";
import { Movie } from "../../components/Movie";
import { MoviesContext } from "../../contexts/MoviesContext";
import { SearchContext } from "../../contexts/SearchContext";
import "./index.css";

export function Home() {
    const [genres, setGenres] = useState([]);
    const [releaseYears, setReleaseYears] = useState([]);
    const { searchQuery } = useContext(SearchContext);
    const { movies, addMovie } = useContext(MoviesContext);
    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [movie, setMovie] = useState({
        id: 11,
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
                <button
                    className="button button--primary"
                    onClick={() => setShowAddMovieModal(true)}
                >
                    Add movie
                </button>
            </div>
            <div className="movies">
                {filteredMovies.length === 0
                    ? "No results found"
                    : filteredMovies.map((movie) => (
                          <Movie key={movie.id} movie={movie} />
                      ))}
            </div>
            <div
                className="modal"
                style={{ display: showAddMovieModal ? "block" : "none" }}
            >
                <div className="modal__content">
                    <label>
                        title
                        <input
                            value={movie.title}
                            type="text"
                            onChange={(e) =>
                                setMovie({ ...movie, title: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        year
                        <input
                            value={movie.year}
                            type="number"
                            onChange={(e) =>
                                setMovie({ ...movie, year: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        genre
                        <input
                            value={movie.genre}
                            type="text"
                            onChange={(e) =>
                                setMovie({ ...movie, genre: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        rating
                        <input
                            value={movie.rating}
                            type="number"
                            onChange={(e) =>
                                setMovie({ ...movie, rating: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        director
                        <input
                            value={movie.director}
                            type="text"
                            onChange={(e) =>
                                setMovie({ ...movie, director: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        writer
                        <input
                            value={movie.writer}
                            type="text"
                            onChange={(e) =>
                                setMovie({ ...movie, writer: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        cast
                        <input
                            value={movie.cast}
                            type="text"
                            onChange={(e) =>
                                setMovie({ ...movie, cast: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        summary
                        <input
                            value={movie.summary}
                            type="text"
                            onChange={(e) =>
                                setMovie({ ...movie, summary: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        image url
                        <input
                            value={movie.imageURL}
                            type="url"
                            onChange={(e) =>
                                setMovie({ ...movie, imageURL: e.target.value })
                            }
                        />
                    </label>
                    <button
                        onClick={() => {
                            addMovie(movie);
                            setShowAddMovieModal(false);
                        }}
                    >
                        Save
                    </button>
                    <button onClick={() => setShowAddMovieModal(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
