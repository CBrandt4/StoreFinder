import React from 'react';
import StoreFinder from './src/screens/googlemaps/StoreFinder';
import PlacesList from './src/screens/googlemaps/PlacesList';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { LocationProvider } from './src/context/LocationContext';
import { StoreProvider } from './src/context/StoreContext';
import Spacer from './src/screens/UI/Spacer.tsx';
import AppHeader from './src/screens/UI/AppHeader.tsx';

const { height } = Dimensions.get('window');

function App(): React.ReactElement {
  return (
    <LocationProvider>
      <StoreProvider>
        <SafeAreaView style={styles.safeArea}>
          <AppHeader />
          <View>
            <View style={styles.storeFinderContainer}>
              <StoreFinder />
            </View>
            <Spacer />
            <PlacesList />
          </View>
        </SafeAreaView>
      </StoreProvider>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f1f1f1',
  },
  storeFinderContainer: {
    height: height / 2,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 100,
    backgroundColor: 'transparent',
  },
});

export default App;
