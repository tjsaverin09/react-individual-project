import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearch = () => {
const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();

const handleChange = (event) => setSearchTerm(event.target.value);

const executeSearch = () => {
  if(searchTerm.trim()) {
    navigate(`Home?query=${encodeURIComponent(searchTerm)}`)
  }
};

const handleKeyDown = (event) => {
  if(event.key === "Enter") {
    executeSearch();
  }
}

  return {
    searchTerm,
    setSearchTerm,
    handleChange,
    handleKeyDown,
    executeSearch,
  }
};


