import React, { useEffect, useState } from 'react';
import Search from './component/search';
import MovieCard from './component/MovieCard';
import Spinner from './component/Spinner';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "17f807688b79c5400c483757b5674b35";  // v3 API key

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMoviesList(data.results || []);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm); // fetch popular movies on first load
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <img src="./hero.png" alt="hero Banner" />

        <header>
          <h1>
            Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle
          </h1>
        </header>

        {/* Search Component */}
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => fetchMovies(searchTerm)}
        />

        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>

          {isLoading ? (
  <>
    <Spinner />
    <p className="text-white">Loading...</p>
  </>
) : errorMessage ? (
  <p className="text-red-500">{errorMessage}</p>
) : (
  <ul>
    {movieList.map((movie) => (
  <MovieCard key={movie.id}movie={movie} />
    ))}
  </ul>
)}

        </section>
      </div>
    </main>
  );
};

export default App;
