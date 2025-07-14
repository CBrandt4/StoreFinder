import React, { useRef } from 'react';
import { useLocation } from '../../context/LocationContext'; // Adjust path as needed
import { View, Text, Image, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useStore } from '../../context/StoreContext';
import MarkerCallout from '../UI/MarkerCallout.tsx';
import styles from './FinderStyles';
import { Clusterer } from 'react-native-clusterer';
import { assignIcon } from '../../utils/assignIcon';
import SearchBar from '../UI/SearchBar';
import LoadingOverlay from '../UI/LoadingOverlay.tsx';
import SearchThisAreaButton from '../UI/SearchThisAreaButton.tsx';

// type Place = {
//   name: string;
//   place_id?: string;
//   vicinity?: string;
//   geometry: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };
// };

const DEFAULT_OPTIONS = {
  radius: 4,
};

const StoreFinder: React.FC = () => {
  const { width: MAP_WIDTH, height: MAP_HEIGHT } = Dimensions.get('window');
  const MAP_DIMENSIONS = { width: MAP_WIDTH, height: MAP_HEIGHT / 2 };
  const mapRef = useRef<MapView | null>(null);

  const { places, fetchStores, region, setRegion } = useStore();
  //fetchStores, loading, error
  const location = useLocation();

  if (!location?.latitude || !location?.longitude) {
    return <LoadingOverlay />;
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
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <SearchBar
        onLocationFound={({ latitude, longitude }) => {
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };

          if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion, 1000); // (1000ms = 1 second)
          }
          setRegion(newRegion);
          fetchStores({ region: newRegion }); // Can uncomment, but this saves API calls when testing search feature
        }}
      />

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          onRegionChangeComplete={setRegion}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.3, //Hardcoded - Can be made dynamic based on user zoom
            longitudeDelta: 0.3, // ^^
          }}
          showsUserLocation
        >
          {region && (
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
                  const { icon, key } = assignIcon(item);

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
          )}
        </MapView>
        <SearchThisAreaButton />
      </View>
    </View>
  );
};

export default StoreFinder;
