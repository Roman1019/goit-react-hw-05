import { useEffect, useState } from "react";
import { fetchMoviesHome } from "../../MoviesService.js";
import MovieList from "../../components/MovieList/MovieList.jsx";

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
        console.log(data);
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
      <MovieList movies={movies} />
    </>
  );
}
