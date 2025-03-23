import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../MoviesService.js";
import { Link } from "react-router";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get("query") ?? "";

  const inputRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = inputRef.current.value.trim();

    const nextParams = new URLSearchParams(searchParams);
    if (searchQuery !== "") {
      nextParams.set("query", searchQuery);
    } else {
      nextParams.delete("query");
    }

    setSearchParams(nextParams);
  };

  useEffect(() => {
    async function getMovies() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovies(query);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [query]);
  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" ref={inputRef} />
        <button>Search</button>
      </form>
      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops something wrong...</b>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
