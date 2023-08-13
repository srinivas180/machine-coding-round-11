import { useContext } from "react";
import { useParams } from "react-router";
import { MoviesContext } from "../../contexts/MoviesContext";
import { WishlistContext } from "../../contexts/WishlistContext";

export function MovieDetails() {
    const { wishlistHasMovie, addMovieToWishlist, removeMovieFromWishlist } =
        useContext(WishlistContext);
    const { movies } = useContext(MoviesContext);
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie.id === Number(movieId));

    function wishlistHandler() {
        wishlistHasMovie(movie.id)
            ? removeMovieFromWishlist(movie.id)
            : addMovieToWishlist(movie);
    }

    return (
        <div>
            <div>
                <img src={movie.imageURL} alt={movie.title} />
            </div>
            <div>
                <h2>{movie.title}</h2>
                <p>{movie.summary}</p>
                <p>year: {movie.year}</p>
                <p>
                    Genre:{" "}
                    {movie.genre.map((g) => (
                        <span>{g}</span>
                    ))}
                </p>
                <p>Rating: {movie.rating}</p>
                <p>Director: {movie.director}</p>
                <p>Writer: {movie.writer}</p>
                <p>
                    Cast:{" "}
                    {movie.cast.map((c) => (
                        <span>{c}</span>
                    ))}
                </p>
                <button
                    className="movie__btn button button--primary"
                    onClick={() => wishlistHandler()}
                >
                    {wishlistHasMovie(movie.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"}
                </button>
            </div>
        </div>
    );
}
