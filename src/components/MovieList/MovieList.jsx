import css from "./MovieList.module.css";
import { TiMediaRecord } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li className={css.moviesItem} key={movie.id}>
              <TiMediaRecord className={css.icon} size={11} />
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
