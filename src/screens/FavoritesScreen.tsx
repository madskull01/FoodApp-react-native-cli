import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
} from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import FoodCard from '../components/FoodCard';

export default function FavoritesScreen({ navigation }: any) {
  const { favorites } = useContext(FavoritesContext);
  const [search, setSearch] = useState('');

  const filtered = favorites.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!favorites.length) {
    return (
      <Text style={{ textAlign: 'center', marginTop: 40 }}>
        No favorites yet
      </Text>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f8' }}>
      <TextInput
        placeholder="Search favorites..."
        value={search}
        onChangeText={setSearch}
        style={{
          margin: 16,
          padding: 14,
          backgroundColor: '#fff',
          borderRadius: 12,
          elevation: 3,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() =>
              navigation.navigate('Details', { item })
            }
          />
        )}
      />
    </View>
  );
}