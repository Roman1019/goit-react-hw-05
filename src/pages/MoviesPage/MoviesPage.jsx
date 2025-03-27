import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../MoviesService.js";
import { useLocation } from "react-router";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  console.log(location);

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
      <div className={css.formDiv}>
        <form onSubmit={handleSearch}>
          <input className={css.input} type="text" ref={inputRef} />
          <button className={css.button}>Search</button>
        </form>
      </div>
      {isLoading && <b>Loading movie...</b>}
      {error && <b>Whoops something wrong...</b>}
      <MovieList movies={movies} />
    </>
  );
}
