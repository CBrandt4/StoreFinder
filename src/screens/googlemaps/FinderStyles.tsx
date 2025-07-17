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

  searchButton: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    backgroundColor: '#006DE3', //or your desired background
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
    backgroundColor: '#006DE3',
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
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },

  listContainer: {
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    marginBottom: 50,
  },
  TouchableOpacity: {
    backgroundColor: 'transparent',
  },
  TouchableOpacityText: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'right',
  },
  item: {
    marginBottom: 1.5,
    marginTop: 1.5,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 0,
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    marginBottom: 0,
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    color: '#272727',
  },
  headerText: {
    fontWeight: 'bold',
    lineHeight: 24,
    fontSize: 18,
  },
  normalText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#515151',
  },
  left: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  externalLink: {
    width: 24,
    height: 24,
  },

  navBar: {
    backgroundColor: '#fff',
  },
});

export default styles;
