import React from 'react';
import StoreFinder from './src/screens/googlemaps/StoreFinder';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

const { height } = Dimensions.get('window');

function App(): React.ReactElement {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.storeFinderContainer}>
        <StoreFinder />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  storeFinderContainer: {
    height: height / 3,
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
