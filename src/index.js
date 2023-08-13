import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { MoviesProvider } from "./contexts/MoviesContext";
import { SearchProvider } from "./contexts/SearchContext";
import { WishlistProvider } from "./contexts/WishlistContext";

import "./index.css";

ReactDOM.render(
    <Router>
        <SearchProvider>
            <MoviesProvider>
                <WishlistProvider>
                    <App />
                </WishlistProvider>
            </MoviesProvider>
        </SearchProvider>
    </Router>,
    document.getElementById("root")
);
