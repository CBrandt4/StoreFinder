import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  mapContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },

  searchButton: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    backgroundColor: '#007AFF', // or your desired background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    zIndex: 100,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
  },

  safeArea: {
    color: '#fff6f6f6',
  },

  offers: {
    marginBottom: 8,
    fontSize: 14,
  },

  button: {
    backgroundColor: '#007AFF',
    width: 150,
    height: 40,
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonOverlay: {
    fontSize: 12,
    width: 150,
    height: 40,
    paddingVertical: 6,
    paddingHorizontal: 10,
    position: 'absolute',
    borderRadius: 8,
    top: 5,
    opacity: 0.9,
    alignSelf: 'center',
  },

  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  markerIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    opacity: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    backgroundColor: 'transparent',
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ClusterMarker: {
    width: 50, // or size of your icon
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ClusterMarkerText: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 12,
    top: 10,
    color: '#fff',
    textAlign: 'center',
  },
});

export default styles;
