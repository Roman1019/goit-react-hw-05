import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesCast } from "../../MoviesService.js";
import css from "./MovieCast.module.css";
import { TiMediaRecord } from "react-icons/ti";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const defaultImg =
    "https://media.istockphoto.com/id/1332100919/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%BF%D1%96%D0%BA%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%B0-%D0%BB%D1%8E%D0%B4%D0%B8%D0%BD%D0%B8-%D1%87%D0%BE%D1%80%D0%BD%D0%B8%D0%B9-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BE%D1%81%D0%BE%D0%B1%D0%B8.jpg?s=612x612&w=0&k=20&c=dpfq7NIr-YrKw--PCwfnPngbk0uxbBg12BBNpk_StKw=";
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
        <ul className={css.castList}>
          {casts.map((cast) => (
            <li className={css.castItem} key={cast.id}>
              <img
                className={css.imgCast}
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : defaultImg
                }
                alt="photo cast"
              />
              <p className={css.castName}>
                <TiMediaRecord className={css.icon} size={11} />
                {cast.name}
              </p>
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
