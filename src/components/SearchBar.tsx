// src/components/SearchBar.tsx
import { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }: { placeholder: string, onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
