import { useEffect, useState } from "react";
import { fetchCreditsById } from "../../services/api";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getData = async () => {
      const data = await fetchCreditsById(movieId);
      setCredits(data);
    };
    getData();
  }, [movieId]);

  return (
    <div>
      <ul className={s.movieList}>
        {credits.length > 0 ? (
          credits.map((credit) => (
            <li key={credit.cast_id} className={s.item}>
              <img
                src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                alt={credit.name || "No Image Available"}
                style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <p className={s.name}>{credit.name}</p>
              <p className={s.charactetr}>Character: {credit.character}</p>
            </li>
          ))
        ) : (
          <p>The cast is missing.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;
