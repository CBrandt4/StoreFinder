import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import { API_KEY } from '@env';
import MarkerCallout from './MarkerCallout';
import styles from './Styles.tsx'; // Assuming styles are defined in a separate file

const OldNavyFinder = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [places, setPlaces] = useState<any[]>([]);

  const OldNavy = true;
  const Gap = false;
  const Athleta = true;
  const BananaRepublic = true;

  let searchStr = '';
  if (OldNavy) {
    searchStr += 'Old Navy';
  }
  if (Gap) {
    searchStr += (searchStr ? ',' : '') + 'Gap';
  }
  if (Athleta) {
    searchStr += (searchStr ? ',' : '') + 'Athleta';
  }
  if (BananaRepublic) {
    searchStr += (searchStr ? ',' : '') + 'Banana Republic';
  }

  console.log('Search string:', searchStr);

  const fetchStores = React.useCallback(
    async (coords: { latitude: number; longitude: number }) => {
      const { latitude, longitude } = coords;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=${searchStr}&type=clothing_store&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPlaces(data.results);
        console.log('Found Old Navy stores:', data.results);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    },
    [searchStr],
  );

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        const coords = { latitude: loc.latitude, longitude: loc.longitude };
        setLocation(coords);
        console.log('Current location:', coords);
        fetchStores(coords);
      })
      .catch(console.warn);
  }, [fetchStores]);

  if (location?.longitude === undefined || location?.latitude === undefined) {
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
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
      showsUserLocation
    >
      {places.map((place: any, index: number) => {
        let icon;
        let key;
        if (place.name && place.name.includes('Old Navy')) {
          icon = require('../../../icons/oldnavyPin.png');
          key = `oldnavy-${index}`;
        } else if (place.name && place.name.includes('Gap')) {
          icon = require('../../../icons/gapPin.png');
          key = `gap-${index}`;
        } else if (place.name && place.name.includes('Athleta')) {
          icon = require('../../../icons/athletaPin.png');
          key = `athleta-${index}`;
        } else if (place.name && place.name.includes('Banana Republic')) {
          icon = require('../../../icons/brPin.png');
          key = `br-${index}`;
        } else {
          icon = require('../../../icons/brPin.png');
          console.warn(`No specific icon for ${place.name}, using default.`);
          // Default icon for other stores
          key = `other-${index}`;
        }
        return (
          <Marker
            key={key}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
          >
            <Image source={icon} style={styles.markerIcon} />
            <MarkerCallout
              loc={{
                title: place.name,
                offers: 'Earn 5% back in rewards!',
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
            />
          </Marker>
        );
      })}
    </MapView>
  );
};

export default OldNavyFinder;
