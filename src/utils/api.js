export const fetchCharacters = async (page, query) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${query}`);
    if (!response.ok) {
      return { results: [], info: { pages: 0 } };
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { results: [], info: { pages: 0 } };
  }
};

export const fetchFavoriteCharacters = async (ids) => {
  if (ids.length === 0) {
    return [];
  }
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};