import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { fetchMoviesDetails } from "../../MoviesService.js";
import { NavLink, Outlet, Link } from "react-router";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const movieId = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkHref = useRef(location.state);
  console.log("backLink", backLinkHref);

  useEffect(() => {
    async function getMoviesDetails() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMoviesDetails(movieId.movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesDetails();
  }, [movieId]);
  // console.log(movie);

  return (
    <div>
      <button>
        <Link to={backLinkHref.current}>Go back</Link>
      </button>
      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops something wrong...</b>}
      {movie && (
        <>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h2>{movie.title}</h2>
          <p>User Score: {`${Math.round(10 * movie.vote_average)}`}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((movi) => (
              <li key={movi.id}>{movi.name}</li>
            ))}
          </ul>
        </>
      )}
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
