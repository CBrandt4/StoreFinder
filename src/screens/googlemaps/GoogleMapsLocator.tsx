import React, { useEffect, useState } from 'react';
import 'FindPlaces';
import MarkerCallout from './MarkerCallout.tsx';
import {
  View,
  StyleSheet,
  //Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const mapStyle = [
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
];

const LOCATIONS = [
  {
    title: 'Gap',
    address1: '458 Christiana Mall',
    offers: 'Earn 5% back in rewards',
    lat: 39.6783298191124,
    lng: -75.6508398932541,
    icon: require('../../../icons/gap.png'),
    size: 50,
  },
  {
    title: 'Athleta',
    address1: '2132 Fashion Center Blvd',
    offers: 'Earn 5% back in rewards',
    lat: 39.67189532289763,
    lng: -75.64853433558196,
    icon: require('../../../icons/athleta.png'),
    size: 50,
  },
  {
    title: 'Old Navy',
    address1: '303 W Main St',
    offers: 'Earn 5% back in rewards',
    lat: 39.66925859885345,
    lng: -75.66603212209014,
    icon: require('../../../icons/oldnavy.png'),
    size: 100,
  },
];

// Google Maps Locator Component
// This component displays a map with markers for the locations defined above

const GoogleMapsLocator = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Get the current location of the user
  // Note: This requires the user to grant location permissions
  useEffect(() => {
    // Fetch places using FindPlaces and set pins on the map
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        setLocation({ latitude: loc.latitude, longitude: loc.longitude });
        console.log('User location:', loc);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  if (location?.longitude === undefined || location?.latitude === undefined) {
    //setLocation.latitude =  39.6783; // Default latitude
    //setLocation.longitude = -75.6508; // Default longitude
    console.warn('Location not available, using default region');
    // If location is not available, use a default region
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 39.6783,
            longitude: -75.6508,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {LOCATIONS.map((loc, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: loc.lat, longitude: loc.lng }}
              title={loc.title}
              description={loc.address1}
            >
              {/* <Image
              source={loc.icon}
              style={{
              width: loc.size,
              height: loc.size,
              resizeMode: 'contain',
              }}
              /> */}
              <MarkerCallout loc={loc} />
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }

  return (
    console.log('Rendering map with user location:', location),
    (
      // Render the map with the user's current location and markers for the defined locations

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {LOCATIONS.map((loc, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: loc.lat, longitude: loc.lng }}
              title={loc.title}
              description={loc.address1}
            >
              {/* <Image
                source={loc.icon}
                style={{
                  width: loc.size,
                  height: loc.size,
                  resizeMode: 'contain',
                }}
              /> */}
              <MarkerCallout loc={loc} />
            </Marker>
          ))}
        </MapView>
      </View>
    )
  );
};

// This styles the container and the map to fill the screen
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMapsLocator;
