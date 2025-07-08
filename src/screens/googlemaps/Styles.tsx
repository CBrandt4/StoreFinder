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
    width: 175,
    height: 70,
    //color: 'RED',
    paddingVertical: 6,
    paddingHorizontal: 10,
    position: 'absolute',
    borderRadius: 8,
    top: 5,
    opacity: 0.9,
    alignSelf: 'center',
  },

  buttonText: {
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ClusterMarker: {
    textDecorationColor: 'white',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default styles;
