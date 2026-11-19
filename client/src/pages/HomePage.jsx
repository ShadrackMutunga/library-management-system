import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';

function HomePage() {
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);

  // Fetch genres for the dropdown filter
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/genres`)
      .then(res => setGenres(res.data))
      .catch(err => console.error("Failed to load genres", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Library Catalog</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar onSearch={setSearch} />
        </div>
        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="border rounded p-2 w-full md:w-48"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      <BookGrid search={search} genreId={genreId} />
    </div>
  );
}

export default HomePage;