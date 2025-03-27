import { useEffect, useState } from "react";
import { fetchMoviesHome } from "../../MoviesService.js";
import { Link } from "react-router";
import { TiMediaRecord } from "react-icons/ti";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getMoviesHome() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMoviesHome();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesHome();
  }, []);
  return (
    <>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Whoops something wrong...</b>}
      <ul>
        {movies.length > 0 &&
          movies.map((movie) => (
            <li className={css.moviesItem} key={movie.id}>
              <TiMediaRecord className={css.icon} size={11} />
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
