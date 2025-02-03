import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../services/api";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const location = useLocation();
  console.log(location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getData = async () => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchSearchMovie(query);
        setMovies(data.length ? data : []);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [query]);

  const handleChangeQuery = (newValue) => {
    if (!newValue.trim()) {
      setSearchParams({}); 
    } else {
      setSearchParams({ query: newValue }); 
    }
  };

  const initialValues = {
    query: "",
  };

  return (
    <div className={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleChangeQuery(values.query);
          resetForm();
        }}
      >
        <Form className={s.form}>
          <Field name="query" className={s.input} />
          <button type="submit" className={s.button}>
            Search
          </button>
        </Form>
      </Formik>
      {loading && <p>Loading...</p>} 
      {error && <p>{error}</p>}
      <ul className={s.movieList}>
        {movies.length > 0
          ? movies.map((movie) => (
              <li key={movie.id} className={s.movieItem}>
                <Link
                  className={s.link}
                  to={`/movies/${movie.id}`}
                  state={location}
                >
                  {movie.title}
                </Link>
              </li>
            ))
          : query && !loading && <p>The movies were not found.</p>}
      </ul>
    </div>
  );
};
export default MoviesPage;
