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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
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
    fontSize: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  address: {
    fontSize: 14,
    color: 'black',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  externalLink: {
    width: 25,
    height: 25,
  },
});

export default styles;
