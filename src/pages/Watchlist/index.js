import { useContext } from "react";

import { WishlistContext } from "../../contexts/WishlistContext";

import "./index.css";

export function Watchlist() {
    const { wishlist } = useContext(WishlistContext);
    const { wishlistHasMovie, addMovieToWishlist, removeMovieFromWishlist } =
        useContext(WishlistContext);

    function wishlistHandler(movie) {
        wishlistHasMovie(movie.id)
            ? removeMovieFromWishlist(movie.id)
            : addMovieToWishlist(movie);
    }

    return (
        <div className="wishlist">
            {wishlist.length === 0
                ? "Wishlist is empty"
                : wishlist.map((movie) => (
                      <div className="movie">
                          <img
                              className="movie__image"
                              src={movie.imageURL}
                              alt={movie.title}
                          />
                          <h3 className="movie__title">{movie.title}</h3>
                          <p>{movie.summary}</p>
                          <button
                              className="movie__btn button button--primary"
                              onClick={() => wishlistHandler(movie)}
                          >
                              {wishlistHasMovie(movie.id)
                                  ? "Remove from wishlist"
                                  : "Add to wishlist"}
                          </button>
                      </div>
                  ))}
        </div>
    );
}
