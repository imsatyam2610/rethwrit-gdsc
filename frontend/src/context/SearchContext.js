"use client";
import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosConfig";
import debounce from "lodash.debounce";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({ posts: [] });

  const fetchAutoSuggestions = debounce((searchTerm) => {
    axiosInstance
      .get(`/page/search?q=${searchTerm}`)
      .then((response) => {
        setSearch(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Search:", error);
      });
  }, 300);

  return (
    <SearchContext.Provider value={{ search, fetchAutoSuggestions }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
