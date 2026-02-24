import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function FoodCard({ item, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: item.thumbNailImage }}
        style={styles.image}
      />

      <View style={styles.content}>
        {/* Title + Price */}
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>

        {/* Cuisine + Category */}
        <Text style={styles.meta}>
          {item.cuisine} • {item.category}
        </Text>

        {/* Rating + Time */}
        <View style={styles.row}>
          <Text style={styles.rating}>
            ⭐ {item.rating}
          </Text>
          <Text style={styles.time}>
            ⏱ {item.prepTimeMins} mins
          </Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {item.tags?.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Veg / Non-Veg Badge */}
        <View
          style={[
            styles.badge,
            {
              backgroundColor: item.isVeg
                ? '#2ecc71'
                : '#e74c3c',
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {item.isVeg ? 'VEG' : 'NON-VEG'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27ae60',
  },
  meta: {
    marginTop: 4,
    color: '#888',
  },
  rating: {
    marginTop: 6,
  },
  time: {
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
  },
  badge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});