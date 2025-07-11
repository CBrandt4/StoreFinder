import React from 'react';
import StoreFinder from './src/screens/googlemaps/StoreFinder';
import PlacesList from './src/screens/googlemaps/PlacesList';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { LocationProvider } from './src/utils/LocationContext';

const { height } = Dimensions.get('window');

function App(): React.ReactElement {
  const [places, setPlaces] = useState<any[]>([]); // Use 'Place[]' if you have a type

  return (
    <LocationProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.storeFinderContainer}>
          <StoreFinder places={places} setPlaces={setPlaces} />
        </View>
        <PlacesList places={places} />
      </SafeAreaView>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  storeFinderContainer: {
    height: height / 2,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 100,
    backgroundColor: 'blue',
    elevation: 4,
  },
});

export default App;
