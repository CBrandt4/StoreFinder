import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const OldNavyFinder = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        const coords = { latitude: loc.latitude, longitude: loc.longitude };
        setLocation(coords);
        fetchOldNavyStores(coords);
      })
      .catch(console.warn);
  }, []);

  const fetchOldNavyStores = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitude, longitude } = coords;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=Old+Navy&type=clothing_store&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlaces(data.results);
      console.log('Found Old Navy stores:', data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Getting current location…</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation
    >
      {places.map((place, idx) => (
        <Marker
          key={idx}
          coordinate={{
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          }}
          title={place.name}
          description={place.vicinity}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OldNavyFinder;
