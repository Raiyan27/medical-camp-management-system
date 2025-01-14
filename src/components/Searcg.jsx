import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for camps..."
        value={searchTerm}
        onChange={handleChange}
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

export default Search;
