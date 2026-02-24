import { toggleFavoriteHelper } from '../src/utils/favoritesHelper';

const mockItem = {
  id: 1,
  title: 'Masala Dosa',
};

describe('toggleFavoriteHelper', () => {
  it('adds item if not in favorites', () => {
    const result = toggleFavoriteHelper([], mockItem);
    expect(result.length).toBe(1);
  });

  it('removes item if already in favorites', () => {
    const result = toggleFavoriteHelper([mockItem], mockItem);
    expect(result.length).toBe(0);
  });
});