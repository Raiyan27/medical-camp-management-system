import React, { useState } from "react";

const Search = ({ onSearch, title }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder={`Search for ${title || ""}...`}
        value={searchTerm}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        aria-label={`Search for ${title}`}
      />
    </div>
  );
};

export default Search;
