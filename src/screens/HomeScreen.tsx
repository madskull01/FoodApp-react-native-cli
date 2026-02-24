import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { fetchFoods } from '../api/foodApi';
import { FoodItem } from '../types/Food';
import FoodCard from '../components/FoodCard';

export default function HomeScreen({ navigation }: any) {
  const [data, setData] = useState<FoodItem[]>([]);
  const [filtered, setFiltered] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    loadData();
    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    try {
      const result = await fetchFoods();
      setData(result);
      setFiltered(result);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filteredList = data.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredList);
  };

  if (!isConnected) {
    return (
      <Text style={{ textAlign: 'center', marginTop: 40 }}>
        You are offline
      </Text>
    );
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f8' }}>
  <TextInput
    placeholder="Search food..."
    value={search}
    onChangeText={handleSearch}
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
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadData();
        }}
      />
    }
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