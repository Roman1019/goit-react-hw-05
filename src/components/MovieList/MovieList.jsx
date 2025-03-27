import css from "./MovieList.module.css";
import { TiMediaRecord } from "react-icons/ti";
import { Link } from "react-router";
export default function MovieList({ movies }) {
  return (
    <>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li className={css.moviesItem} key={movie.id}>
              <TiMediaRecord className={css.icon} size={11} />
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
