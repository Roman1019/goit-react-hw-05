import axios from "axios";

export const fetchMoviesHome = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
    {
      params: {
        api_key: "94c6a1b82922671e6e69cf44a2ab5cff",
      },
    }
  );

  return response.data.results;
};

export const fetchMovies = async (value) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        api_key: "94c6a1b82922671e6e69cf44a2ab5cff",
        query: value,
      },
    }
  );

  return response.data.results;
};

export const fetchMoviesDetails = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: "94c6a1b82922671e6e69cf44a2ab5cff",
      },
    }
  );

  return response.data;
};

// https://api.themoviedb.org/3/search/movie?query=${value}
