import React from 'react';
import StoreFinder from './src/components/organisms/StoreMap.tsx';
import PlacesList from './src/components/organisms/StoreList.tsx';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { LocationProvider } from './src/context/LocationContext';
import { StoreProvider } from './src/context/StoreContext';
import Spacer from './src/components/molecules/Spacer.tsx';
import AppHeader from './src/components/molecules/AppHeader.tsx';

const { height } = Dimensions.get('window');

function App(): React.ReactElement {
  return (
    <LocationProvider>
      <StoreProvider>
        <SafeAreaView style={styles.safeArea}>
          <AppHeader />
          <View style={styles.storeFinderContainer}>
            <StoreFinder />
          </View>
          <Spacer />
          <PlacesList />
          <Spacer />
          <Spacer />
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
