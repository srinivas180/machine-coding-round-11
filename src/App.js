import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";

import { Home } from "./pages/Home";
import "./App.css";
import { Watchlist } from "./pages/Watchlist";
import { useContext } from "react";
import { SearchContext } from "./contexts/SearchContext";
import { MovieDetails } from "./pages/MovieDetails";

function App() {
    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    return (
        <div className="App">
            <div>
                <h1>IMDB</h1>
                <div>
                    Search:
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="search movies by title, cast or director"
                    />
                </div>
                <nav>
                    <NavLink to="/">Movies</NavLink>
                    <NavLink to="/watchlist">Watchlist</NavLink>
                    <NavLink to="/starred">Starred</NavLink>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
            </Routes>
        </div>
    );
}

export default App;
