export const toggleFavoriteHelper = (favorites: any[], item: any) => {
  const exists = favorites.find(f => f.id === item.id);

  if (exists) {
    return favorites.filter(f => f.id !== item.id);
  }

  return [...favorites, item];
};