import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

export default function DetailsScreen({ route }: any) {
  const { item } = route.params;
  const { toggleFavorite, isFavorite } =
    useContext(FavoritesContext);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: item.mainImage }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.price}>₹{item.price}</Text>

        <Text style={styles.meta}>
          {item.cuisine} • {item.category}
        </Text>

        <Text style={styles.rating}>
          ⭐ {item.rating}
        </Text>

        <Text style={styles.time}>
          ⏱ {item.prepTimeMins} minutes
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.section}>Tags:</Text>
        <View style={styles.tagsContainer}>
          {item.tags?.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Button
            title={
              isFavorite(item.id)
                ? 'Remove from Favorites'
                : 'Add to Favorites'
            }
            onPress={() => toggleFavorite(item)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  price: {
    fontSize: 20,
    color: '#27ae60',
    marginVertical: 6,
  },
  meta: { color: '#777' },
  rating: { marginTop: 6 },
  time: { marginTop: 6 },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    marginTop: 16,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
});