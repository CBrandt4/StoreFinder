import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Place = {
  name: string;
  place_id?: string;
  vicinity?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

type PlacesListProps = {
  places: Place[];
};

const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No stores found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.place_id ?? item.name}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.address}>
            {item.vicinity ?? 'No address available'}
          </Text>
        </View>
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 10,
  },
  item: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    fontSize: 14,
    color: '#444',
  },
});
