import { useEffect, useState } from "react";
import { fetchTrendingMoviesToday } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrendingMoviesToday();
      setMovies(data);
    };
    getData();
  }, []);
  return (
    <div className={s.container}>
      <h2 className={s.title}>Trending today</h2>
      <MovieList movies={movies} />
    </div>
  );
};
export default HomePage;
