import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesCast } from "../../MoviesService.js";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getCast() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMoviesCast(movieId);
        setCasts(data.cast);
        console.log(data.cast);
      } catch (error) {
        console.log(error);

        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);
  return (
    <>
      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops something wrong...</b>}
      {casts.length > 0 ? (
        <ul>
          {casts.map((cast) => (
            <li key={cast.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt=""
              />
              <p>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any cast for this movie</p>
      )}
    </>
  );
}
