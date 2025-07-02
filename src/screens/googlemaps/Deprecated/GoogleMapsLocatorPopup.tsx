/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const LOCATIONS = [
  {
    title: 'Gap',
    address1: '458 Christiana Mall',
    lat: 39.6783298191124,
    lng: -75.6508398932541,
    icon: require('../../../icons/gap.png'),
    size: 50,
  },
  {
    title: 'Athleta',
    address1: '2132 Fashion Center Blvd',
    lat: 39.67189532289763,
    lng: -75.64853433558196,
    icon: require('../../../icons/athleta.png'),
    size: 50,
  },
  {
    title: 'Old Navy',
    address1: '303 W Main St',
    lat: 39.66925859885345,
    lng: -75.66603212209014,
    icon: require('../../../icons/oldnavy.png'),
    size: 100,
  },
];

const GoogleMapsLocator = () => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        const coords = { latitude: loc.latitude, longitude: loc.longitude };
        console.log('User location:', coords);
        // Animate the map to the user's location
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...coords,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            },
            1000,
          );
        }
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 39.6783,
          longitude: -75.6508,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
      >
        {LOCATIONS.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: loc.lat, longitude: loc.lng }}
          >
            <Image
              source={loc.icon}
              style={{
                width: loc.size,
                height: loc.size,
                resizeMode: 'contain',
              }}
            />
            <Callout>
              <View style={{ width: 200 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  {loc.title}
                </Text>
                <Text style={{ marginBottom: 8 }}>{loc.address1}</Text>
                <TouchableOpacity
                  onPress={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
                    console.log('Opening URL:', url);
                    Linking.openURL(url);
                  }}
                  style={{
                    backgroundColor: '#4285F4',
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Get Directions
                  </Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMapsLocator;
