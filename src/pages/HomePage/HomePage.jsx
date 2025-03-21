import { useEffect, useState } from "react";
import { fetchMoviesHome } from "../../MoviesService.js";
import { Link } from "react-router";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getMoviesHome() {
      const data = await fetchMoviesHome();
      setMovies(data);
      // console.log(data);
    }
    getMoviesHome();
  });
  return (
    <>
      <ul>
        {movies.length > 0 &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
