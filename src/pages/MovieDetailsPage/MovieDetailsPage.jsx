import { useEffect, useState, useRef, Suspense } from "react";
import { useLocation, useParams } from "react-router";
import { fetchMoviesDetails } from "../../MoviesService.js";
import { NavLink, Outlet, Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import css from "./MovieDetailsPage.module.css";

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
      <div className={css.buttonDiv}>
        <Link to={backLinkHref.current ?? "/"}>
          <button className={css.buttonGoBack}>
            <FaArrowLeft className={css.arrow} />
            Go back
          </button>
        </Link>
      </div>

      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops something wrong...</b>}
      {movie && (
        <div className={css.imgTextDiv}>
          <div>
            <img
              className={css.imgGeneral}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          </div>
          <div>
            <h2>
              {movie.title} ({movie.release_date.split("-")[0]})
            </h2>
            <p>User Score: {`${Math.round(10 * movie.vote_average)}`}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul>
              {movie.genres.map((movi) => (
                <li key={movi.id}>{movi.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading cast or reviews...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
