import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import s from "./MovieDetaisPage.module.css";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const location = useLocation();
  console.log(location);
  const goBackRef = useRef(location.state);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieById(movieId);
      setMovie(data);
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return null;
  }

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div className={s.movieDetails}>
      <Link to={goBackRef.current} className={s.goBack}>
        Go back
      </Link>
      <div className={s.content}>
        <div className={s.imageContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={s.movieImage}
          />
        </div>
        <div className={s.textContent}>
          <h2>{movie.title}</h2>
          <p>User Score: {(movie.vote_average * 10).toFixed(0)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
        </div>
      </div>
      <hr />
      <p>Additional information</p>
      <nav>
        <ul className={s.list}>
          <li>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Suspense fallback={<h2>Second saspense</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
