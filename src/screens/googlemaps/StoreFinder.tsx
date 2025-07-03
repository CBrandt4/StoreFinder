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
  const [oldNavyPlaces, setOldNavyPlaces] = useState<any[]>([]);
  const [gapPlaces, setGapPlaces] = useState<any[]>([]);
  const [athletaPlaces, setAthletaPlaces] = useState<any[]>([]);
  const [brPlaces, setBRPlaces] = useState<any[]>([]);
  ``;

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        const coords = { latitude: loc.latitude, longitude: loc.longitude };
        setLocation(coords);
        console.log('Current location:', coords);
        fetchOldNavyStores(coords);
        fetchGapStores(coords);
        fetchAthletaStores(coords);
        fetchBRStores(coords);
      })
      .catch(console.warn);
  }, []);

  // const fetchOldNavyStores = async (coords: {
  //   latitude: number;
  //   longitude: number;
  // }) => {
  //   const { latitude, longitude } = coords;
  //   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=Old+Navy,Athleta,Gap,Banana+Republic&type=clothing_store&key=${API_KEY}`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setPlaces(data.results);
  //     console.log('Found Old Navy stores:', data.results);
  //   } catch (error) {
  //     console.error('Error fetching places:', error);
  //   }
  // };

  const fetchOldNavyStores = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitude, longitude } = coords;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=Old+Navy&type=clothing_store&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setOldNavyPlaces(data.results);
      console.log('Found Old Navy stores:', data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchGapStores = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitude, longitude } = coords;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=Gap&type=clothing_store&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setGapPlaces(data.results);
      console.log('Found Gap stores:', data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchAthletaStores = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitude, longitude } = coords;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=Athleta&type=clothing_store&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setAthletaPlaces(data.results);
      console.log('Found Athleta stores:', data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchBRStores = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitude, longitude } = coords;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=Banana+Republic&type=clothing_store&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBRPlaces(data.results);
      console.log('Found Banana Republic stores:', data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

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
      {[...oldNavyPlaces, ...gapPlaces, ...athletaPlaces, ...brPlaces].map(
        (place: any, index: number) => {
          let icon;
          let key;
          if (place.name.includes('Old Navy')) {
            icon = require('../../../icons/oldnavyPin.png');
            key = `oldnavy-${index}`;
          } else if (place.name.includes('Gap')) {
            icon = require('../../../icons/gapPin.png');
            key = `gap-${index}`;
          } else if (place.name.includes('Athleta')) {
            icon = require('../../../icons/athletaPin.png');
            key = `athleta-${index}`;
          } else if (place.name.includes('Banana Republic')) {
            icon = require('../../../icons/brPin.png');
            key = `br-${index}`;
          } else {
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
        },
      )}
    </MapView>
  );
};

export default OldNavyFinder;
