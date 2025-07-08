import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import { API_KEY } from '@env';
import MarkerCallout from './MarkerCallout';
import styles from './Styles';
import { Clusterer } from 'react-native-clusterer';

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

type StoreFinderProps = {
  places: Place[];
  setPlaces: (places: Place[]) => void;
};

const initialRegion = {
  latitude: 39.6783,
  longitude: -75.6508,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
};

const DEFAULT_OPTIONS = {
  radius: 4,
};

const StoreFinder: React.FC<StoreFinderProps> = ({ places, setPlaces }) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [region, setRegion] = useState(initialRegion);

  const { width: MAP_WIDTH, height: MAP_HEIGHT } = Dimensions.get('window');
  const MAP_DIMENSIONS = { width: MAP_WIDTH, height: MAP_HEIGHT / 2 };

  const OldNavy = true;
  const Gap = true;
  const Athleta = true;
  const BananaRepublic = true;

  let searchStr = '';
  if (OldNavy) searchStr += 'Old Navy';
  if (Gap) searchStr += (searchStr ? ',' : '') + 'Gap';
  if (Athleta) searchStr += (searchStr ? ',' : '') + 'Athleta';
  if (BananaRepublic) searchStr += (searchStr ? ',' : '') + 'Banana Republic';

  const miles = 15;
  const meters = 1609.34 * miles;

  const fetchStores = useCallback(
    async (coords: { latitude: number; longitude: number }) => {
      const { latitude, longitude } = coords;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${meters}&keyword=${searchStr}&type=clothing_store&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPlaces(data.results || []);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    },
    [meters, searchStr, setPlaces],
  );

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(loc => {
        const coords = { latitude: loc.latitude, longitude: loc.longitude };
        setLocation(coords);
      })
      .catch(console.warn);
  }, []);

  if (!location?.latitude || !location?.longitude) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Getting current location…</Text>
      </View>
    );
  }

  const markers = (places ?? []).map((place, index) => ({
    type: 'Feature' as const,
    geometry: {
      type: 'Point' as const,
      coordinates: [place.geometry.location.lng, place.geometry.location.lat],
    },
    properties: {
      id: index,
      name: place.name,
      place,
    },
  }));

  return (
    <View style={styles.mapContainer}>
      <MapView
        onRegionChangeComplete={setRegion}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.45,
          longitudeDelta: 0.45,
        }}
        showsUserLocation
      >
        <Clusterer
          data={markers}
          region={region}
          options={DEFAULT_OPTIONS}
          mapDimensions={MAP_DIMENSIONS}
          renderItem={item => {
            if ('cluster_id' in item.properties) {
              return (
                <Marker
                  key={`cluster-${item.properties.cluster_id}`}
                  coordinate={{
                    latitude: item.geometry.coordinates[1],
                    longitude: item.geometry.coordinates[0],
                  }}
                >
                  <View style={styles.ClusterMarker}>
                    <Image
                      source={require('../../../icons/clusterMarker.png')}
                      style={styles.markerIcon}
                    />
                    <Text style={styles.ClusterMarkerText}>
                      +{item.properties.point_count}
                    </Text>
                  </View>
                </Marker>
              );
            } else {
              const place = item.properties.place;
              let icon;
              let key;

              if (place.name.includes('Old Navy')) {
                icon = require('../../../icons/oldnavyPin.png');
                key = `oldnavy-${item.properties.id}`;
              } else if (place.name.includes('Gap')) {
                icon = require('../../../icons/gapPin.png');
                key = `gap-${item.properties.id}`;
              } else if (place.name.includes('Athleta')) {
                icon = require('../../../icons/athletaPin.png');
                key = `athleta-${item.properties.id}`;
              } else if (place.name.includes('Banana Republic')) {
                icon = require('../../../icons/brPin.png');
                key = `br-${item.properties.id}`;
              } else {
                icon = require('../../../icons/defaultMarker.png');
                key = `other-${item.properties.id}`;
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
            }
          }}
        />
      </MapView>

      <View style={styles.buttonOverlay}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            fetchStores(region);
            console.log('Button pressed, fetching stores with region:', region);
          }}
        >
          <Text style={styles.searchButtonText}>Search this area</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreFinder;
