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
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  markerIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    opacity: 1.0,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
