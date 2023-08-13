import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../contexts/WishlistContext";

export function Movie({ movie }) {
    const { wishlistHasMovie, addMovieToWishlist, removeMovieFromWishlist } =
        useContext(WishlistContext);

    function wishlistHandler() {
        wishlistHasMovie(movie.id)
            ? removeMovieFromWishlist(movie.id)
            : addMovieToWishlist(movie);
    }

    return (
        <div className="movie">
            <Link
                className="link--black link--decor-none"
                to={`/movie/${movie.id}`}
            >
                <img
                    className="movie__image"
                    src={movie.imageURL}
                    alt={movie.title}
                />
                <h3 className="movie__title">{movie.title}</h3>
                <p>{movie.summary}</p>
            </Link>
            <button className="movie__btn button button--primary">Star</button>
            <button
                className="movie__btn button button--primary"
                onClick={() => wishlistHandler()}
            >
                {wishlistHasMovie(movie.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
            </button>
        </div>
    );
}
