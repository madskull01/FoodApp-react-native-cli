import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodItem } from '../types/Food';

interface FavoritesContextType {
  favorites: FoodItem[];
  toggleFavorite: (item: FoodItem) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FoodItem[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem('favorites');
    if (data) setFavorites(JSON.parse(data));
  };

  const saveFavorites = async (items: FoodItem[]) => {
    setFavorites(items);
    await AsyncStorage.setItem('favorites', JSON.stringify(items));
  };

  const toggleFavorite = (item: FoodItem) => {
    const exists = favorites.find(f => f.id === item.id);
    if (exists) {
      saveFavorites(favorites.filter(f => f.id !== item.id));
    } else {
      saveFavorites([...favorites, item]);
    }
  };

  const isFavorite = (id: string) =>
    favorites.some(f => f.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};