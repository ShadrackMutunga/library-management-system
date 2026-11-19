import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p className="text-gray-500 p-4">Loading book details...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!book) return <p className="p-4">Book not found.</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link to="/" className="text-blue-600 hover:underline mb-4 block">&larr; Back to Catalog</Link>
      
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-xl text-gray-600 mb-6">by {book.author}</p>
      
      <div className="bg-gray-100 p-6 rounded-lg space-y-3">
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Genre:</strong> {book.genre?.name || 'Unknown'}</p>
        <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
        <p><strong>Available Copies:</strong> {book.availableCopies} / {book.totalCopies}</p>
      </div>
    </div>
  );
}

export default BookDetail;