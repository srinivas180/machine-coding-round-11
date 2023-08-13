import { createContext, useState } from "react";

import { moviesData } from "../db/moviesData";
export const MoviesContext = createContext();

export function MoviesProvider({ children }) {
    const [movies, setMovies] = useState(moviesData);

    function addMovie(movie) {
        setMovies((movies) => [...movies, movie]);
    }

    return (
        <MoviesContext.Provider value={{ movies, addMovie }}>
            {children}
        </MoviesContext.Provider>
    );
}
