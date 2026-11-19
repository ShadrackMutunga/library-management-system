import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

function BookGrid({ search, genreId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (search) params.search = search;
        if (genreId) params.genreId = genreId;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books`, { params });
        // Handle both array response and paginated response { books: [...] }
        const data = Array.isArray(response.data) ? response.data : response.data.books;
        setBooks(data);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, genreId]);

  if (loading) return <p className="text-gray-500">Loading books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (books.length === 0) return <p className="text-gray-500">No books found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;