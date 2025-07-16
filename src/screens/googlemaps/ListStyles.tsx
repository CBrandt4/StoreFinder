import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'black',
  },
  listContainer: {
    padding: 10,
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
  },
  header: {
    marginBottom: 0,
    marginTop: 15,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    fontSize: 14,
    color: 'black',
  },
});

export default styles;
