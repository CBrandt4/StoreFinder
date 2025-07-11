import styles from './ListStyles';
import { getDistance, convertDistance } from 'geolib';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
//import React from 'react';
import { useLocation } from '../../utils/LocationContext'; // Adjust path as needed
type Place = {
  name: string;
  place_id?: string;
  vicinity?: string; //address
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
  const location = useLocation();

  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No stores found.</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Getting your location...</Text>
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
          <Text>
            {item.geometry && item.geometry.location
              ? `${convertDistance(
                  getDistance(
                    {
                      latitude: item.geometry.location.lat,
                      longitude: item.geometry.location.lng,
                    },
                    {
                      latitude: location.latitude,
                      longitude: location.longitude,
                    },
                  ),
                  'mi',
                ).toFixed(2)} miles`
              : 'Distance not available'}
          </Text>
          <Text style={styles.address}>
            {item.vicinity ?? 'No address available'}
          </Text>
          <View>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${item.geometry.location.lat},${item.geometry.location.lng}`;
                console.log('Opening URL:', url);
                Linking.openURL(url);
              }}
            >
              <Text style={styles.TouchableOpacityText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default PlacesList;
