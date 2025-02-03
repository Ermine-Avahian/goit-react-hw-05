import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2IyMzQ4YmQ4MWYxZWU1MmNhYTRmZjk3Zjc0MzYwZSIsIm5iZiI6MTcyOTI5MTk3OC41MDcsInN1YiI6IjY3MTJlNmNhMjVjNzBiOGIxZDY3ZjA0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R6InQK2LsPaYdjoTG94cf46paa7p372NizOozi9upN4";

const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchTrendingMoviesToday = async () => {
  const { data } = await axiosInstance.get("/trending/movie/day");
  return data.results;
};

export const fetchMovieById = async (movieId) => {
  const { data } = await axiosInstance.get(`movie/${movieId}`);
  return data;
};

export const fetchCreditsById = async (movieId) => {
  const { data } = await axiosInstance.get(`movie/${movieId}/credits`);
  return data.cast;
};

export const fetchReviewsById = async (movieId) => {
  const { data } = await axiosInstance.get(`movie/${movieId}/reviews`);
  return data.results;
};

export const fetchSearchMovie = async (query) => {
  const { data } = await axiosInstance.get(`search/movie`, {
    params: { query },
  });
  return data.results;
};
