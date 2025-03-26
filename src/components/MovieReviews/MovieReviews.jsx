import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesReviews } from "../../MoviesService.js";
import { TiMediaRecord } from "react-icons/ti";
import css from "./MovieReviews.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMoviesReviews(movieId);
        setReviews(data.results);
        console.log(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);
  return (
    <div>
      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops something wrong...</b>}
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li className={css.item} key={review.id}>
              <div className={css.itemDiv}>
                <TiMediaRecord className={css.icon} size={11} />
                <h3 className={css.head}>Author: {review.author}</h3>
              </div>

              <p className={css.paragraph}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie</p>
      )}
    </div>
  );
}
