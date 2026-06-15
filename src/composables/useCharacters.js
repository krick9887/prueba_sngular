import { useState, useEffect } from 'react';
import { fetchCharacters, fetchFavoriteCharacters } from '../utils/api';

export const useCharacters = (favorites) => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteDetails, setFavoriteDetails] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchQuery(filter);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [filter]);

  // Reset page on new search
  useEffect(() => {
    setShowFavorites(false);
    setCurrentPage(1);
  }, [searchQuery]);

  // Fetch favorite characters' details
  useEffect(() => {
    if (!showFavorites) {
      setFavoriteDetails([]);
      return;
    }

    const loadFavorites = async () => {
      setLoading(true);
      const details = await fetchFavoriteCharacters(favorites);
      setFavoriteDetails(details);
      setLoading(false);
    };

    loadFavorites();
  }, [showFavorites, favorites]);

  useEffect(() => {
    const getPersonajes = async () => {
      if (showFavorites) {
        setPersonajes([]);
        return;
      }
      setLoading(true);
      const data = await fetchCharacters(currentPage, searchQuery);
      setPersonajes(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    };

    getPersonajes();
  }, [currentPage, searchQuery, showFavorites]);

  const handlePageChange = (page) => {
    setShowFavorites(false);
    setCurrentPage(page);
  };

  const displayedPersonajes = showFavorites ? favoriteDetails : personajes;

  return {
    loading,
    filter,
    setFilter,
    searchQuery,
    showFavorites,
    setShowFavorites,
    displayedPersonajes,
    totalPages,
    currentPage,
    handlePageChange,
  };
};