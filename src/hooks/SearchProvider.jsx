import React,{ createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchContext = createContext();

export const SearchProvider = ({ children }) =>{
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()

    const handleChange = (event) => setSearchTerm(event.target.value);

    const executeSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/searchLibrary?query=${encodeURIComponent(searchTerm)}`)
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            executeSearch();
        }
    };

  return (
   <SearchContext.Provider value={{ searchTerm, setSearchTerm, handleChange, handleKeyDown, executeSearch}}>
    {children}
   </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);


