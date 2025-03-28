import { useEffect, useState, useRef, Suspense } from "react";
import { useLocation, useParams } from "react-router";
import { fetchMoviesDetails } from "../../MoviesService.js";
import { NavLink, Outlet, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import css from "./MovieDetailsPage.module.css";
import { TiMediaRecord } from "react-icons/ti";

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

  return (
    <div>
      <div className={css.buttonDiv}>
        <Link to={backLinkHref.current ?? "/movies"}>
          <button className={css.buttonGoBack}>
            <FaArrowLeft className={css.arrow} />
            Go back
          </button>
        </Link>
      </div>

      {isLoading && <b>Loading details movie...</b>}
      {error && <b>Whoops something wrong...</b>}
      {movie && (
        <div className={css.imgTextDiv}>
          <img
            className={css.imgGeneral}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={250}
          />

          <div>
            <h2 className={css.titleMovie}>
              {movie.title} ({movie.release_date.split("-")[0]})
            </h2>
            <p className={css.userScore}>
              User Score: {`${Math.round(10 * movie.vote_average)}`}%
            </p>
            <h3 className={css.overview}>Overview</h3>
            <p className={css.overviewPar}>{movie.overview}</p>
            <h3 className={css.genres}>Genres</h3>
            <ul className={css.genresList}>
              {movie.genres.map((movi) => (
                <li key={movi.id}>{movi.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={css.infoDiv}>
        <h4 className={css.headCastReviews}>Additional information</h4>
        <ul className={css.infoList}>
          <li className={css.infoItem}>
            <TiMediaRecord className={css.icon} size={11} />
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li className={css.infoItem}>
            <TiMediaRecord className={css.icon} size={11} />
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading cast or reviews...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
