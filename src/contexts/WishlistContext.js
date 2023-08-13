import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist"));

    const [wishlist, setWishlist] = useState(
        wishlistData === null ? [] : wishlistData
    );

    function addMovieToWishlist(movie) {
        setWishlist((w) => {
            return [...w, movie];
        });
    }

    function removeMovieFromWishlist(movieId) {
        setWishlist((w) => w.filter((movie) => movie.id !== movieId));
    }

    function wishlistHasMovie(movieId) {
        return wishlist.find((movie) => movie.id === movieId);
    }

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addMovieToWishlist,
                removeMovieFromWishlist,
                wishlistHasMovie,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}
