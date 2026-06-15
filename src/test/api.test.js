import { fetchCharacters, fetchFavoriteCharacters } from './api';

global.fetch = jest.fn();

describe('API utility functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchCharacters', () => {
    it('should call the correct API endpoint with page and query', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [], info: { pages: 1 } }),
      });

      await fetchCharacters(2, 'morty');

      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?page=2&name=morty');
    });

    it('should handle API errors gracefully', async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      const data = await fetchCharacters(1, 'nonexistent');
      expect(data).toEqual({ results: [], info: { pages: 0 } });
    });
  });

  describe('fetchFavoriteCharacters', () => {
    it('should call the correct API endpoint with a list of IDs', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([{ id: 1, name: 'Rick' }]),
      });

      await fetchFavoriteCharacters([1, 5, 10]);

      expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1,5,10');
    });

    it('should return an empty array if no IDs are provided', async () => {
      const data = await fetchFavoriteCharacters([]);
      expect(data).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });
  });
});