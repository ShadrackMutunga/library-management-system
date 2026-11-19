import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Debounce logic: wait 400ms after typing stops before firing
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);

    // Cleanup function cancels the previous timer on every new keystroke
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
}

export default SearchBar;