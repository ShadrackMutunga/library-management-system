import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <Link to={`/books/${book.id}`} className="text-blue-600 hover:underline">
        <h3 className="text-xl font-bold">{book.title}</h3>
      </Link>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-sm text-gray-500 mt-2">Genre: {book.genre?.name || 'Unknown'}</p>
      <p className="text-sm text-gray-500">Copies available: {book.availableCopies}/{book.totalCopies}</p>
    </div>
  );
}

export default BookCard;